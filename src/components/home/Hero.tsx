import Link from "next/link";
import { FiArrowDownRight, FiFeather } from "react-icons/fi";
import ContentImage from "@/components/ui/ContentImage";
import SocialLinks from "@/components/layout/SocialLinks";
import Container from "@/components/ui/Container";
import { getProfile, getSiteSettings } from "@/lib/data";

export default function Hero() {
  const site = getSiteSettings();
  const profile = getProfile();
  const intro = profile.intro.startsWith("এখানে")
    ? site.description
    : profile.intro;

  return (
    <section className="home-hero">
      <Container className="home-hero-grid">
        <div className="home-hero-copy">
          <p className="section-eyebrow">{site.designation}</p>
          <h1 className="home-hero-title">{site.name}</h1>
          <p className="home-hero-tagline">{site.tagline}</p>
          <p className="home-hero-description">{intro}</p>
          <div className="home-hero-actions">
            <Link className="button-primary" href="/creations">
              সৃষ্টিকর্ম দেখুন
              <FiArrowDownRight aria-hidden="true" />
            </Link>
            <Link className="home-secondary-link" href="/about">
              পরিচিতি
            </Link>
          </div>
          <SocialLinks links={site.socialLinks} />
        </div>
        <div className="home-hero-art">
          <div className="home-hero-image-frame">
            <ContentImage
              src={site.heroImage || site.profileImage}
              alt={`${site.name} — পরিচিতি`}
              sizes="(max-width: 48rem) 88vw, 42vw"
              priority
              className="home-hero-image"
              fallback={
                <div className="home-hero-fallback">
                  <span className="hero-orbit hero-orbit-one" />
                  <span className="hero-orbit hero-orbit-two" />
                  <span className="hero-emblem">
                    <FiFeather aria-hidden="true" />
                  </span>
                  <span className="hero-art-caption">{site.tagline}</span>
                </div>
              }
            />
          </div>
          <p className="home-hero-art-note">{site.name}</p>
        </div>
      </Container>
    </section>
  );
}