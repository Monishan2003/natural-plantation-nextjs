# Hostinger VPS Deployment Guide

## VPS Info
- IP: `72.61.115.222`
- Hostname: `srv1740262.hstgr.cloud`

---

## Step 1 — One-time VPS Setup

SSH into your VPS and run the setup script:

```bash
ssh root@72.61.115.222
bash <(curl -s https://raw.githubusercontent.com/monishan2003/natural-plantation-nextjs/main/scripts/vps-setup.sh)
```

---

## Step 2 — Add GitHub Secrets

Go to GitHub repo → **Settings → Secrets and variables → Actions** and add:

| Secret Name | Value |
|---|---|
| `VPS_HOST` | `72.61.115.222` |
| `VPS_USER` | `root` |
| `VPS_SSH_KEY` | Your VPS private SSH key (generate below) |
| `VPS_PORT` | `22` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://eqqczxgwrqlgrknhhjtf.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

### Generate SSH key for GitHub Actions:
```bash
# On your local machine:
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/hostinger_deploy

# Copy public key to VPS:
ssh-copy-id -i ~/.ssh/hostinger_deploy.pub root@72.61.115.222

# Copy private key to GitHub Secret VPS_SSH_KEY:
cat ~/.ssh/hostinger_deploy
```

---

## Step 3 — First Manual Deploy

```bash
ssh root@72.61.115.222
cd /var/www/natural-plantation
docker compose up -d --build
```

Your site will be live at: `http://72.61.115.222`

---

## Step 4 — Set Up SSL (HTTPS)

```bash
ssh root@72.61.115.222

# Point your domain's A record to 72.61.115.222 first, then:
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Then uncomment the HTTPS block in `nginx/nginx.conf` and enable the HTTP→HTTPS redirect.

---

## Auto-Deploy (CI/CD)

Every `git push` to `main` will automatically:
1. SSH into VPS
2. Pull latest code
3. Rebuild Docker image
4. Restart containers

---

## Useful Commands on VPS

```bash
# View running containers
docker compose ps

# View app logs
docker compose logs -f app

# Restart app
docker compose restart

# Full rebuild
docker compose down && docker compose up -d --build
```
