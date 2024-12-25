import InternshipDetailsPage from "@/components/internshipDetails";
import Footer from "@/components/footer";
import JobDetailsPage from "@/components/jobDetails";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient";
import MootDetailsPage from "@/components/mootDetails";
import CompetitionDetailsPage from "@/components/competitionDetails";
import ConferenceDetailsPage from "@/components/conferenceDetails";
import CallForPapersDetails from "@/components/callForPaperDetails";

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
        {category.toLowerCase() == "jobs" && <JobDetailsPage data={data} />}
        {category.toLowerCase() == "internships" && (
          <InternshipDetailsPage data={data} />
        )}
        {category.toLowerCase() == "moots" && <MootDetailsPage data={data} />}
        {category.toLowerCase() == "competitions" && (
          <CompetitionDetailsPage data={data} />
        )}
        {category.toLowerCase() == "conferences" && (
          <ConferenceDetailsPage data={data} />
        )}
        {category.toLowerCase() == "callforpapers" && (
          <CallForPapersDetails data={data} />
        )}
      </main>
      <Footer />
    </div>
  );
}
