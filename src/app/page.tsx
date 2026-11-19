import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Banner from "@/components/home/Banner";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Banner />
      </main>
      <Footer />
    </>
  );
}