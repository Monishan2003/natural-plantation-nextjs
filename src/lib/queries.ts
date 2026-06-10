import { supabasePublic as supabase } from "@/lib/supabase/public";
import type { Tables } from "@/lib/database.types";

export type Company = Tables<"companies">;
export type CompanyFact = Tables<"company_facts">;
export type NewsArticle = Tables<"news_articles">;
export type TeamMember = Tables<"team_members">;
export type TimelineEvent = Tables<"timeline_events">;

/* ---- New CMS-driven content tables ---- */
export interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  role: string;
  sort_order: number;
  active: boolean;
}
export interface EcosystemProduct {
  id: string;
  name: string;
  kind: string;
  description: string;
  platforms: string[];
  ios_url: string | null;
  android_url: string | null;
  web_url: string | null;
  coming_soon: boolean;
  sort_order: number;
  active: boolean;
}
export interface ServiceGroup {
  id: string;
  company_slug: string;
  company_name: string;
  blurb: string;
  sort_order: number;
  active: boolean;
}
export interface ServiceItem {
  id: string;
  group_id: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
}
export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  sort_order: number;
  active: boolean;
}
export interface ValueItem {
  id: string;
  title: string;
  body: string;
  icon: string;
  sort_order: number;
  active: boolean;
}
export interface CompanyHighlight {
  id: string;
  company_id: string;
  bullet: string;
  sort_order: number;
}
export interface PartnerLogo {
  id: string;
  name: string;
  kind: "text" | "image";
  image_url: string | null;
  text_color: string | null;
  bg_color: string | null;
  sort_order: number;
  active: boolean;
}

/* ---- Typed shapes for the JSONB site_settings values ---- */
export interface HomeStat {
  n: number;
  suf: string;
  label: string;
  sub: string;
}
export interface KeyValueStat {
  k: string;
  v: string;
}
export interface HeadOffice {
  name: string;
  email: string;
  phone: string;
  reg_number: string;
  address_line1: string;
  address_line2: string;
}
export interface FooterColumn {
  heading: string;
  links: { href: string; label: string }[];
}
export interface ContactDepartment {
  label: string;
  email: string;
}
export type SocialLinks = Record<string, string>;

/* ---------------- Companies ---------------- */
export async function getCompanies(): Promise<Company[]> {
  const { data } = await supabase
    .from("companies")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getCompanyFacts(): Promise<CompanyFact[]> {
  const { data } = await supabase
    .from("company_facts")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

/* ---------------- News ---------------- */
export async function getNews(opts?: {
  limit?: number;
  featuredFirst?: boolean;
}): Promise<NewsArticle[]> {
  let query = supabase
    .from("news_articles")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (opts?.limit) query = query.limit(opts.limit);
  const { data } = await query;
  return data ?? [];
}

/* ---------------- Team & Timeline ---------------- */
export async function getTeam(): Promise<TeamMember[]> {
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  const { data } = await supabase
    .from("timeline_events")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

/* ---------------- Site settings (JSONB key/value) ---------------- */
export async function getSiteSetting<T>(key: string): Promise<T | null> {
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return (data?.value as T) ?? null;
}

/* ---------------- New CMS tables ---------------- */
type Generic = Record<string, unknown>;

async function listFrom<T>(
  table: string,
  opts: { activeOnly?: boolean } = {},
): Promise<T[]> {
  let q = supabase.from(table).select("*").order("sort_order", { ascending: true });
  if (opts.activeOnly !== false) q = q.eq("active", true);
  const { data } = await q;
  return (data ?? []) as T[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return listFrom<Testimonial>("testimonials");
}

export async function getEcosystem(): Promise<EcosystemProduct[]> {
  return listFrom<EcosystemProduct>("ecosystem_products");
}

export async function getServiceGroups(): Promise<
  (ServiceGroup & { services: ServiceItem[] })[]
> {
  const [groupsRes, itemsRes] = await Promise.all([
    supabase.from("service_groups").select("*").eq("active", true).order("sort_order"),
    supabase.from("services_items").select("*").order("sort_order"),
  ]);
  const groups = (groupsRes.data ?? []) as ServiceGroup[];
  const items = (itemsRes.data ?? []) as ServiceItem[];
  return groups.map((g) => ({
    ...g,
    services: items.filter((i) => i.group_id === g.id),
  }));
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return listFrom<ProcessStep>("process_steps");
}

export async function getValues(): Promise<ValueItem[]> {
  return listFrom<ValueItem>("values_items");
}

export async function getCompanyHighlights(): Promise<CompanyHighlight[]> {
  const { data } = await supabase
    .from("company_highlights")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as CompanyHighlight[];
}

export async function getPartnerLogos(): Promise<PartnerLogo[]> {
  return listFrom<PartnerLogo>("partner_logos");
}

/* ---------------- FAQs ---------------- */
export interface FaqCategory {
  id: string;
  slug: string;
  name_en: string;
  icon: string | null;
  display_order: number | null;
}
export interface Faq {
  id: string;
  category_id: string;
  question_en: string;
  answer_en: string;
  display_order: number | null;
  is_featured: boolean | null;
}

export async function getFaqCategories(): Promise<FaqCategory[]> {
  const { data } = await supabase
    .from("faq_categories")
    .select("id, slug, name_en, icon, display_order")
    .order("display_order", { ascending: true });
  return (data ?? []) as FaqCategory[];
}

export async function getFaqs(): Promise<Faq[]> {
  const { data } = await supabase
    .from("faqs")
    .select("id, category_id, question_en, answer_en, display_order, is_featured")
    .order("display_order", { ascending: true });
  return (data ?? []) as Faq[];
}

/* ---------------- Blog ---------------- */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  reading_time: string | null;
  tags: string[];
  status: string;
  published_at: string | null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, author, excerpt, content, cover_url, reading_time, tags, status, published_at",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data ?? []) as BlogPost[];
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, title, author, excerpt, content, cover_url, reading_time, tags, status, published_at",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return (data as BlogPost | null) ?? null;
}

// Helper type used by the queries above to silence TS where columns aren't typed.
type _Unused = Generic;
export type { _Unused as _GenericRow };
