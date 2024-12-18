import { supabase } from "@/lib/supabaseClient"; // Adjust path as needed

export default async function handler(req, res) {
  // Ensure that the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get state from query parameters
  const { state } = req.query;

  if (!state) {
    return res.status(400).json({ error: "State parameter is required" });
  }

  try {
    // Fetch data from Supabase tables concurrently using Promise.all
    const [jobsData, internshipsData, competitionsData, mootsData] =
      await Promise.all([
        supabase
          .from("jobs")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .eq("state", state)
          .order("start_date", { ascending: true }),
        supabase
          .from("internships")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .eq("state", state)
          .order("start_date", { ascending: true }),
        supabase
          .from("competitions")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .eq("state", state)
          .order("start_date", { ascending: true }),
        supabase
          .from("moots")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .eq("state", state)
          .order("start_date", { ascending: true }),
      ]);

    // Check for errors in any of the queries
    if (
      jobsData.error ||
      internshipsData.error ||
      competitionsData.error ||
      mootsData.error
    ) {
      console.error(
        "Error fetching data:",
        jobsData.error ||
          internshipsData.error ||
          competitionsData.error ||
          mootsData.error
      );
      return res
        .status(500)
        .json({ error: "Error fetching data from Supabase" });
    }

    // Concatenate the data from all tables into a single object
    const categoryData = {
      jobs: jobsData.data,
      internships: internshipsData.data,
      competitions: competitionsData.data,
      moots: mootsData.data,
    };
    // Step 1: Get the current date

    // console.log("categoryData: ", categoryData);
    // Step 2: Filter events within each category where created_at is within the last week
    const filteredCategoryData = Object.keys(categoryData).reduce(
      (acc, category) => {
        const filteredEvents = categoryData[category].filter((event) => {
          const currentDate = new Date();
          const eventDeadline = new Date(event.deadline);
          return eventDeadline >= currentDate; // Filter events created less than a week ago
        });
        if (filteredEvents.length > 0) {
          acc[category] = filteredEvents; // Only include categories with valid events
        }
        return acc;
      },
      {}
    );
    // console.log("filteredCategoryData: ", filteredCategoryData);

    // Return the filtered data as a JSON response
    res.status(200).json(filteredCategoryData);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error" });
  }
}
