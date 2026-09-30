import { About } from "@/components/About";
import { Career } from "@/components/Career";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { Stack } from "@/components/Stack";
import { MAIN_CONTENT_ID } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="focus:outline-none">
        <Hero />
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
