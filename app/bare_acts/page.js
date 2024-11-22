'use client'
import BareActsContainer from "@/components/bareActsContainer";
import FilterBar from "@/components/filterBar";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useSearchParams } from "next/navigation";

export default function LandingPage() {
  const searchparams=useSearchParams();
  const page=searchparams.get("page")||1;
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        {/* <FilterBar/> */}
        <BareActsContainer page={page}/>
      </main>
      <Footer />
    </div>
  );
}