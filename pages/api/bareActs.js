// pages/api/bareActs.js

import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Query the 'bare_acts' table
      const { data: central_acts_data, error: central_acts_error } = await supabase
        .from("central_bare_acts")
        .select("*") // You can specify columns here if needed
        .limit(40)
        .order("year", { ascending: false });

      const { data: state_acts_data, error: state_acts_error } = await supabase
        .from("state_bare_acts")
        .select("*") // You can specify columns here if needed
        .limit(40)
        .order("year", { ascending: false });

      const data=[...central_acts_data, ...state_acts_data]

      if (central_acts_error) {
        return res.status(500).json({ message: "Error fetching data", central_acts_error });
      }

      // Return the fetched data
      res.status(200).json(data);
    } catch (central_acts_error) {
      res.status(500).json({ message: "Error", central_acts_error: central_acts_error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
