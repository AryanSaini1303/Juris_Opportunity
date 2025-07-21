import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('central_bare_acts')
      .select('category', { count: 'exact', head: false })
      .neq('category', null) // Skips nulls if needed
      .order('category', { ascending: true });
    const uniqueCategories = Array.from(
      new Set(data.map((item) => item.category)),
    );
    if (error) {
      throw error;
    }
    res.status(200).json(uniqueCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}