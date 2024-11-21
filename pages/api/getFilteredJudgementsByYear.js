import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  try {
    const { year } = req.query;
    let query;
    // Call the custom function for year
    query = await supabase.rpc("get_judgements_filtered_by_year", {
      p_year: year,
    });
    // Return results if successful
    if (query.error) {
      return res.status(500).json({ error: query.error.message });
    }
    res.status(200).json(query.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
