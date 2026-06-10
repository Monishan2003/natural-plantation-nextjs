/**
 * Fallback testimonials used only when the DB-driven list is empty. The
 * canonical source is the `testimonials` table in Supabase (admin-editable).
 */

export interface Testimonial {
  quote: string;
  author_name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Natural Plantation has become our most dependable distribution partner across the North — reliable supply, honest pricing and genuine local commitment.",
    author_name: "Regional Distributor",
    role: "Jaffna · FMCG",
  },
  {
    quote:
      "Their biometric, well-run branch operations make working together effortless. You can feel the discipline behind the brand.",
    author_name: "Supply Partner",
    role: "Vavuniya · Wholesale",
  },
  {
    quote:
      "Sourcing organic produce from their Kilinochchi estate has been a clear win for our shelves and for our customers who care where things come from.",
    author_name: "Retail Buyer",
    role: "Colombo · Grocery",
  },
];
