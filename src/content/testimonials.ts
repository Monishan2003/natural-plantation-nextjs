/**
 * Testimonials carousel content. Placeholder partners — replace with real,
 * attributable quotes before launch (§10). No avatars invented; we render
 * monogram initials instead of stock faces.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Natural Plantation has become our most dependable distribution partner across the North — reliable supply, honest pricing and genuine local commitment.",
    name: "Regional Distributor",
    role: "Jaffna · FMCG",
  },
  {
    quote:
      "Their biometric, well-run branch operations make working together effortless. You can feel the discipline behind the brand.",
    name: "Supply Partner",
    role: "Vavuniya · Wholesale",
  },
  {
    quote:
      "Sourcing organic produce from their Kilinochchi estate has been a clear win for our shelves and for our customers who care where things come from.",
    name: "Retail Buyer",
    role: "Colombo · Grocery",
  },
];
