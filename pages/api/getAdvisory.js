import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from("advisory")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
