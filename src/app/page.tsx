import { About } from "@/components/About";
import { Career } from "@/components/Career";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { Stats } from "@/components/Stats";
import { StructuredData } from "@/components/StructuredData";
import { Stack } from "@/components/Stack";
import { MAIN_CONTENT_ID } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SkipLink />
      <SiteHeader />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Stats />
        <About />
        <SelectedWork />
        <Career />
        <Stack />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
