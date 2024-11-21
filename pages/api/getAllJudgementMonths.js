import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.rpc("get_distinct_months");

      if (error) {
        console.error("Error fetching distinct years:", error);
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
