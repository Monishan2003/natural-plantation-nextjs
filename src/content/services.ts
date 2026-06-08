/**
 * Service categories grouped by company (spec §3.3). Static content —
 * derived from the verified company roles, no invented figures.
 */

export interface ServiceItem {
  title: string;
  desc: string;
  icon: string; // lucide-react icon name
}

export interface ServiceGroup {
  company: string;
  companySlug: string;
  blurb: string;
  services: ServiceItem[];
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    company: "Natural Plantation",
    companySlug: "natural-plantation",
    blurb: "Retail, FMCG distribution and branded consumer goods.",
    services: [
      { title: "Retail network", desc: "30+ branches serving the Northern & Eastern provinces.", icon: "Store" },
      { title: "FMCG distribution", desc: "Fast-moving consumer goods reaching towns and villages.", icon: "Truck" },
      { title: "Branded products", desc: "Oils, soaps and groceries made and packaged under our own label.", icon: "Package" },
      { title: "E-commerce", desc: "Online ordering with island-wide delivery (rolling out).", icon: "ShoppingCart" },
    ],
  },
  {
    company: "NF Plantation",
    companySlug: "nf-plantation",
    blurb: "Group holding and business-partnership facilitation.",
    services: [
      { title: "Group holding", desc: "The corporate structure behind the Natural Plantation brand.", icon: "Building2" },
      { title: "Partnership facilitation", desc: "Supply, distribution, joint venture and land-sharing partnerships.", icon: "Handshake" },
      { title: "Enterprise support", desc: "Shared operations, governance and management technology.", icon: "Briefcase" },
      { title: "Biometric operations", desc: "ZKTeco / Live U attendance across all branches.", icon: "Fingerprint" },
    ],
  },
  {
    company: "Nature Farming",
    companySlug: "nature-farming",
    blurb: "Agricultural production across 120 acres in Kilinochchi.",
    services: [
      { title: "Coconut", desc: "Cultivation and processing for oils and consumer products.", icon: "TreePalm" },
      { title: "Aloe vera", desc: "Organic aloe grown for wellness and personal-care lines.", icon: "Sprout" },
      { title: "Spices", desc: "Northern-grown spices, cleaned and packed for retail.", icon: "Flower2" },
      { title: "Cotton", desc: "Cotton cultivation feeding our garment supply chain.", icon: "Shirt" },
    ],
  },
];

export interface ProcessStep {
  title: string;
  desc: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { title: "Discover", desc: "We listen to the need — a product, a region, a partnership." },
  { title: "Partner", desc: "We agree clear terms and the right structure for both sides." },
  { title: "Grow", desc: "We build, distribute and operate with local teams." },
  { title: "Sustain", desc: "We reinvest in people, land and community for the long term." },
];
