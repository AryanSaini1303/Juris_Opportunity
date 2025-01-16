import Footer from "@/components/footer";
import HomeContent from "@/components/homeContent";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <h1>Coming soon...</h1>
      </main>
      <Footer />
    </div>
  );
}