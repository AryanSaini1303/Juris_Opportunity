import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  try {
    const { query } = req.query; // Get the search query from the request
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required." });
    }

    let combinedResults = [];
    let error;

    // Search in central_bare_acts table
    let { data: centralData, error: centralError } = await supabase
      .from("central_bare_acts")
      .select("*")
      .ilike("name", `%${query}%`); // ILIKE for case-insensitive search

    if (centralError) {
      return res.status(500).json({ error: centralError.message });
    }

    // Add central_bare_acts results to combinedResults
    if (centralData && centralData.length > 0) {
      combinedResults = [...combinedResults, ...centralData];
    }

    // Search in state_bare_acts table
    let { data: stateData, error: stateError } = await supabase
      .from("state_bare_acts")
      .select("*")
      .ilike("name", `%${query}%`);

    if (stateError) {
      return res.status(500).json({ error: stateError.message });
    }

    // Add state_bare_acts results to combinedResults
    if (stateData && stateData.length > 0) {
      combinedResults = [...combinedResults, ...stateData];
    }

    // If no results are found by name, check for year
    if (combinedResults.length === 0 && !isNaN(query)) {
      const year = parseInt(query, 10);

      // Search year in central_bare_acts
      let { data: yearCentralData, error: yearCentralError } = await supabase
        .from("central_bare_acts")
        .select("*")
        .eq("year", year);

      if (yearCentralError) {
        return res.status(500).json({ error: yearCentralError.message });
      }

      if (yearCentralData && yearCentralData.length > 0) {
        combinedResults = [...combinedResults, ...yearCentralData];
      }

      // Search year in state_bare_acts
      let { data: yearStateData, error: yearStateError } = await supabase
        .from("state_bare_acts")
        .select("*")
        .eq("year", year);

      if (yearStateError) {
        return res.status(500).json({ error: yearStateError.message });
      }

      if (yearStateData && yearStateData.length > 0) {
        combinedResults = [...combinedResults, ...yearStateData];
      }
    }

    // If still no data is found
    if (combinedResults.length === 0) {
      return res
        .status(404)
        .json({ message: "No judgements found matching the query." });
    }

    // Return combined results
    res.status(200).json(combinedResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
