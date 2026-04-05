import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { DEFAULT_SITE_URL } from "@/lib/constants";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Database = {
  public: {
    Tables: {
      customer_messages: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          phone: string | null;
          email: string | null;
          subject: string | null;
          message: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          phone?: string | null;
          email?: string | null;
          subject?: string | null;
          message: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          phone?: string | null;
          email?: string | null;
          subject?: string | null;
          message?: string;
        };
        Relationships: [];
      };
      order_requests: {
        Row: {
          id: string;
          created_at: string;
          order_code: string;
          customer_name: string;
          phone: string;
          email: string | null;
          city: string;
          district: string;
          address: string;
          note: string | null;
          items: Json;
          subtotal: number;
          grand_total: number;
          status: string;
          source: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          order_code: string;
          customer_name: string;
          phone: string;
          email?: string | null;
          city: string;
          district: string;
          address: string;
          note?: string | null;
          items: Json;
          subtotal: number;
          grand_total: number;
          status?: string;
          source?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          order_code?: string;
          customer_name?: string;
          phone?: string;
          email?: string | null;
          city?: string;
          district?: string;
          address?: string;
          note?: string | null;
          items?: Json;
          subtotal?: number;
          grand_total?: number;
          status?: string;
          source?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let browserClient: SupabaseClient<Database> | null = null;

function requiredValue(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`${name} tanimli degil.`);
  }

  return value;
}

export function hasSupabaseBrowserEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && getSupabaseBrowserKey());
}

function getSupabaseBrowserKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function createSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const url = requiredValue("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey = requiredValue("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", getSupabaseBrowserKey());

  browserClient = createClient<Database>(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return browserClient;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}
