import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Overview from "@/components/Overview";
import MasterclassStructure from "@/components/MasterclassStructure";
import Pricing from "@/components/Pricing";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Navigation />
      <Hero />
      <Overview />
      <MasterclassStructure />
      <Pricing />
      <Registration />
      <Footer />
    </div>
  );
}
