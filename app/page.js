import Footer from "@/components/footer";
import HomeContent from "@/components/homeContent";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="wrapper">
      <Navbar/>
      <HomeContent/>
      <Footer/>
    </div>
  );
}