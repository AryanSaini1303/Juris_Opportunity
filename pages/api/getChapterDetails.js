import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { chapterId } = req.query;
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data } = await supabase // instead of writing "response" and then extracting "data" from it, we can directly extract "data" from the "response" by destructuring it
      .from("chapters")
      .select("*")
      .eq("id", chapterId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
