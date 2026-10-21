import type { Metadata } from "next";
import CreativeLife from "@/components/profile/CreativeLife";
import EducationCard from "@/components/profile/EducationCard";
import Interests from "@/components/profile/Interests";
import JourneyCard from "@/components/profile/JourneyCard";
import PersonalWorlds from "@/components/profile/PersonalWorlds";
import ProfileHero from "@/components/profile/ProfileHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProfile, getSiteSettings } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

const site = getSiteSettings();

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — ${site.designation}. ${site.tagline}`,
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
};

export default function AboutPage() {
  const profile = getProfile();

  return (
    <>
      <ProfileHero />
      <Container className="profile-page">
        <section className="profile-section" aria-labelledby="journey-heading">
          <SectionHeading
            id="journey-heading"
            eyebrow="Professional life"
            title="Professional journey"
          />
          <JourneyCard entries={profile.professionalJourney} />
        </section>

        <section className="profile-section" aria-labelledby="education-heading">
          <SectionHeading
            id="education-heading"
            eyebrow="Education"
            title="Academic background"
          />
          <EducationCard entries={profile.education} />
        </section>

        <CreativeLife entries={profile.creativeLife} />
        <Interests entries={profile.interests} />
        <PersonalWorlds paragraphs={profile.personalWords} />
      </Container>
    </>
  );
}
