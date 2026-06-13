#!/bin/bash
# Run this ONCE on the Hostinger VPS as root to set up the server.
# Usage: bash vps-setup.sh

set -e

echo "=== Updating system ==="
apt-get update && apt-get upgrade -y

echo "=== Installing Docker ==="
apt-get install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "=== Installing Git ==="
apt-get install -y git

echo "=== Installing Certbot for SSL ==="
apt-get install -y certbot python3-certbot-nginx

echo "=== Cloning repository ==="
mkdir -p /var/www
cd /var/www
git clone https://github.com/monishan2003/natural-plantation-nextjs.git natural-plantation
cd natural-plantation

echo "=== Creating .env.production ==="
cat > .env.production << 'EOF'
# Fill in your Supabase credentials:
NEXT_PUBLIC_SUPABASE_URL=https://eqqczxgwrqlgrknhhjtf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE
EOF

echo ""
echo "=== Setup complete! ==="
echo ""
echo "Next steps:"
echo "1. Edit /var/www/natural-plantation/.env.production with real keys"
echo "2. Run: cd /var/www/natural-plantation && docker compose up -d --build"
echo "3. For SSL: certbot --nginx -d yourdomain.com"
echo "4. Add GitHub Secrets (see DEPLOYMENT.md)"
