import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Process from "@/components/Process";
import Features from "@/components/Features";
import Insights from "@/components/Insights";
import DesignSystem from "@/components/DesignSystem";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Problem />
      <Process />
      <Features />
      <Insights />
      <DesignSystem />
      <Footer />
    </main>
  );
}
