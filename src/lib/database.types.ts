// Generated from Supabase project eqqczxgwrqlgrknhhjtf (do not edit by hand).
// Regenerate with: supabase gen types typescript --project-id eqqczxgwrqlgrknhhjtf
// Only the tables this marketing site reads/writes are typed below.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          accent: string | null;
          accent2: string | null;
          description: string | null;
          disclaimer: boolean;
          id: string;
          image_url: string | null;
          name: string;
          name_tamil: string | null;
          role: string;
          slug: string;
          sort_order: number;
          tagline: string | null;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      company_facts: {
        Row: {
          company_id: string;
          id: string;
          sort_order: number;
          value_long: string;
          value_short: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          country: string | null;
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          organisation: string | null;
          phone: string | null;
          read: boolean;
          subject: string | null;
          type: string;
        };
        Insert: {
          country?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          organisation?: string | null;
          phone?: string | null;
          read?: boolean;
          subject?: string | null;
          type: string;
        };
        Update: never;
        Relationships: [];
      };
      news_articles: {
        Row: {
          category: string;
          content: string | null;
          created_at: string;
          date: string;
          excerpt: string;
          featured: boolean;
          id: string;
          image_url: string | null;
          published: boolean;
          read_time_min: number;
          slug: string;
          title: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      team_members: {
        Row: {
          bio: string | null;
          id: string;
          image_url: string | null;
          name: string;
          role: string;
          sort_order: number;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      timeline_events: {
        Row: {
          body: string | null;
          event_date: string;
          id: string;
          sort_order: number;
          title: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];
