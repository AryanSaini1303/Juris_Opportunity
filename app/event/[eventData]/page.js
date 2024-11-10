import InternshipDetailsPage from "@/components/internshipDetails";
import Footer from "@/components/footer";
import JobDetailsPage from "@/components/jobDetails";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient";

export default async function EventPage({ params }) {
  const { eventData } = await params;
  const [category, id] = eventData.split("_");
  const { data, error } = await supabase
    .from(category.toLowerCase())
    .select("*")
    .eq("id", id)
    .order("start_date", { ascending: true });
  // if (error) {
  //   console.log(error);
  // }
  // console.log(data);

  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        {category.toLowerCase()=="jobs"&&<JobDetailsPage data={data}/>}
        {category.toLowerCase()=="internships"&&<InternshipDetailsPage data={data}/>}
      </main>
      <Footer />
    </div>
  );
}
