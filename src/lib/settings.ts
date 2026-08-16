import { createClient as createServerClient } from "./supabaseServer";

/**
 * Interface representing a site setting.
 */
export interface SiteSetting {
  key: string;
  value: any;
  created_at: string;
}

/**
 * Fetches all site settings from the database (server-side).
 * Falls back to an empty object if table is empty or error occurs.
 * Does not throw to ensure the page always renders.
 */
export async function getSiteSettings(): Promise<Record<string, any>> {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      console.error("Error fetching site_settings:", error);
      return {};
    }

    if (!data) return {};

    const settings: Record<string, any> = {};
    for (const row of data) {
      settings[row.key] = row.value;
    }
    return settings;
  } catch (error) {
    console.error("Exception in getSiteSettings:", error);
    return {};
  }
}

/**
 * Gets a specific setting or returns the default value.
 */
export function getSettingValue<T>(settings: Record<string, any>, key: string, defaultValue: T): T {
  if (settings && key in settings) {
    return settings[key] as T;
  }
  return defaultValue;
}
