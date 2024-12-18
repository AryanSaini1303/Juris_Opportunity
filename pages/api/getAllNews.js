import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const response = await supabase
        .from("news")
        .select("*")
        .limit(30)
        .order("created_at", { ascending: false });
        res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
