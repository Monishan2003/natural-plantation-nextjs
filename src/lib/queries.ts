import { supabasePublic as supabase } from "@/lib/supabase/public";
import type { Tables } from "@/lib/database.types";

export type Company = Tables<"companies">;
export type CompanyFact = Tables<"company_facts">;
export type NewsArticle = Tables<"news_articles">;
export type TeamMember = Tables<"team_members">;
export type TimelineEvent = Tables<"timeline_events">;

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
