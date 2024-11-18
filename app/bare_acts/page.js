import BareActsContainer from "@/components/bareActsContainer";
import FilterBar from "@/components/filterBar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <FilterBar/>
        <BareActsContainer/>
      </main>
      <Footer />
    </div>
  );
}
