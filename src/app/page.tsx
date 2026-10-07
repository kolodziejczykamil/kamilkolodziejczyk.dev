import { About } from "@/components/About";
import { Career } from "@/components/Career";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { LatestNotes } from "@/components/LatestNotes";
import { SelectedWork } from "@/components/SelectedWork";
import { SideProjects } from "@/components/SideProjects";
import { Stats } from "@/components/Stats";
import { StructuredData } from "@/components/StructuredData";
import { Stack } from "@/components/Stack";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Stats />
      <About />
      <SelectedWork />
      <SideProjects />
      <LatestNotes />
      <Career />
      <Stack />
      <Contact />
    </>
  );
}
