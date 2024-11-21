import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  try {
    const monthMapping = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };
    const { year, month } = req.query;
    const monthNum = monthMapping[month];
    let query;
    if (year && month) {
      // Call the custom function for year and month
      query = await supabase.rpc("get_judgements_filtered_by_year_and_month", {
        p_year: year,
        p_month: monthNum,
      });
    }
    // Return results if successful
    if (query.error) {
      return res.status(500).json({ error: query.error.message });
    }
    res.status(200).json(query.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
