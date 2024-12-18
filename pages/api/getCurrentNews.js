import { supabase } from "@/lib/supabaseClient";

export default async function handler(req, res) {
  const { id } = req.query;
//   console.log(id);
  try {
    const response = await supabase.from("news").select("*").eq("id", id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
