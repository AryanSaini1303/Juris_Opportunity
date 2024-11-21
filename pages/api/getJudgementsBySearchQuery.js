import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  try {
    const { query } = req.query; // Get the search query from the request
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    // Perform a case-insensitive search on the judgements title
    const { data, error } = await supabase
      .from("judgements")
      .select("*")
      .ilike("title", `%${query}%`); // ILIKE is case-insensitive search

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No judgements found matching the query." });
    }

    // Return the filtered data
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
