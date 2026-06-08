/**
 * Per-company highlight bullets for the Companies page. Sourced from the
 * verified company descriptions in Supabase — no invented figures.
 */
export const COMPANY_HIGHLIGHTS: Record<string, string[]> = {
  "natural-plantation": [
    "30+ retail branches across the Northern & Eastern provinces",
    "Coconut oil, soaps, body care and spices under our own label",
    "Garments and everyday pantry essentials",
    "Everything produced or sourced within Sri Lanka",
  ],
  "nf-plantation": [
    "Registered holding company of the group",
    "Coordinates investment and partnership review",
    "Group governance and shared services",
    "Not a licensed finance company — no public deposits",
  ],
  "nature-farming": [
    "120-acre cultivation plot in Kilinochchi",
    "Aloe vera, coconut, turmeric and cotton",
    "Low-chemical, high-yield growing practices",
    "Output feeds the Natural Plantation supply chain",
  ],
};

/** Sector-relevant photo per company (used instead of the brand logos). */
export const COMPANY_IMAGE: Record<string, string> = {
  "natural-plantation": "/images/div-products.png",
  "nf-plantation": "/images/div-finance.png",
  "nature-farming": "/images/aloe-vera-plantation.png",
};
