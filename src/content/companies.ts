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
  "natural-plantation": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
  "nf-plantation": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
  "nature-farming": "https://images.unsplash.com/photo-1547517023-d6636f40c12a?auto=format&fit=crop&w=2000&q=80",
};
