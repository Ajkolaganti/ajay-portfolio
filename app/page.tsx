import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IDCard from "@/components/IDCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillsGrid from "@/components/SkillsGrid";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0D0D0D]">
      <Navbar />
      <HeroSection />
      <IDCard />
      <ExperienceTimeline />
      <SkillsGrid />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
