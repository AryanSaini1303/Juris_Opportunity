import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { subjectId } = req.query;
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data, error } = await supabase
      .from("chapters")
      .select("id, name, description, subject_name")
      .eq("subject_id", subjectId)
      .order("id", { ascending: true });

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
