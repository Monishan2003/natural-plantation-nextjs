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
      testimonials: {
        Row: {
          id: string;
          quote: string;
          author_name: string;
          role: string;
          sort_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      ecosystem_products: {
        Row: {
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
          created_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      service_groups: {
        Row: {
          id: string;
          company_slug: string;
          company_name: string;
          blurb: string;
          sort_order: number;
          active: boolean;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      services_items: {
        Row: {
          id: string;
          group_id: string;
          title: string;
          description: string;
          icon: string;
          sort_order: number;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      process_steps: {
        Row: {
          id: string;
          title: string;
          description: string;
          sort_order: number;
          active: boolean;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      values_items: {
        Row: {
          id: string;
          title: string;
          body: string;
          icon: string;
          sort_order: number;
          active: boolean;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      company_highlights: {
        Row: {
          id: string;
          company_id: string;
          bullet: string;
          sort_order: number;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      partner_logos: {
        Row: {
          id: string;
          name: string;
          kind: string;
          image_url: string | null;
          text_color: string | null;
          bg_color: string | null;
          sort_order: number;
          active: boolean;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      faq_categories: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          icon: string | null;
          display_order: number | null;
          created_at: string | null;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          category_id: string;
          question_en: string;
          answer_en: string;
          display_order: number | null;
          is_featured: boolean | null;
          helpful_count: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      blog_posts: {
        Row: {
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
          created_at: string;
          updated_at: string;
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
