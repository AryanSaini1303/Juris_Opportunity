import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query } = req.query;
    console.log(query);
    try {
      // Query the 'bare_acts' table
      const { data, error } = await supabase
        .from("central_bare_acts")
        .select("*") // You can specify columns here if needed
        .eq("category", query)
        .order("year", { ascending: false });

      if (error) {
        return res.status(500).json({ message: "Error fetching data", error });
      }

      // Return the fetched data
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
