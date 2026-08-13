import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10 flex-1">
        <Hero />
        <Services />
        <Capabilities />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
