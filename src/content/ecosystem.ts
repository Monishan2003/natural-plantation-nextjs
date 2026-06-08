/**
 * Digital Ecosystem showcase (AGENT.md §4 / spec §4).
 * Placeholders until live — store/web links stay "#" with a "Coming soon"
 * state; never ship a dead link styled as live (§10).
 */

export interface EcosystemProduct {
  name: string;
  kind: string;
  desc: string;
  platforms: ("iOS" | "Android" | "Web")[];
  ios?: string;
  android?: string;
  web?: string;
  comingSoon?: boolean;
}

export const ECOSYSTEM: EcosystemProduct[] = [
  {
    name: "Natural Plantation App",
    kind: "Mobile app",
    desc: "Shop products, find a branch and track orders from your phone.",
    platforms: ["iOS", "Android"],
    ios: "#",
    android: "#",
    comingSoon: true,
  },
  {
    name: "Natural Plantation Store",
    kind: "E-commerce",
    desc: "Order our oils, soaps and groceries online for island-wide delivery.",
    platforms: ["Web"],
    web: "#",
    comingSoon: true,
  },
  {
    name: "NF Plantation Website",
    kind: "Website",
    desc: "The corporate hub for our group holding and partnership facilitation.",
    platforms: ["Web"],
    web: "#",
    comingSoon: true,
  },
  {
    name: "NF Plantation Management",
    kind: "Operations app",
    desc: "Branch and workforce management for staff across 30+ locations.",
    platforms: ["Android"],
    android: "#",
    comingSoon: true,
  },
  {
    name: "Nature Farming Portal",
    kind: "Website",
    desc: "Cultivation updates and produce sourcing from our 120-acre estate.",
    platforms: ["Web"],
    web: "#",
    comingSoon: true,
  },
  {
    name: "Natural Plantation Careers",
    kind: "Web app",
    desc: "Browse open roles and apply to join the group across the North & East.",
    platforms: ["Web"],
    web: "#",
    comingSoon: true,
  },
];
