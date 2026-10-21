import Link from "next/link";
import { FiArrowDownRight, FiFeather } from "react-icons/fi";
import ContentImage from "@/components/ui/ContentImage";
import SocialLinks from "@/components/layout/SocialLinks";
import Container from "@/components/ui/Container";
import { getCategories, getProfile, getSiteSettings } from "@/lib/data";
import { isPlaceholderText } from "@/lib/placeholder";

function formatCount(value: number): string {
  return value.toString().padStart(2, "0");
}

export default function Hero() {
  const site = getSiteSettings();
  const profile = getProfile();
  const categories = getCategories();
  const intro = isPlaceholderText(profile.intro)
    ? site.description
    : profile.intro;
  const countFor = (slugs: readonly string[]) =>
    categories.filter((category) => slugs.includes(category.slug)).length;
  const stats = [
    { value: categories.length, label: "Collections" },
    {
      value: countFor(["poems", "short-stories", "novels"]),
      label: "Writing collections",
    },
    {
      value: countFor(["islamic-music", "music-videos"]),
      label: "Music collections",
    },
  ];

  return (
    <section className="home-hero">
      <span className="sparkle hero-sparkle hero-sparkle-one" aria-hidden="true" />
      <span className="sparkle hero-sparkle hero-sparkle-two" aria-hidden="true" />
      <span
        className="sparkle hero-sparkle hero-sparkle-three"
        aria-hidden="true"
      />
      <Container className="home-hero-grid">
        <div className="home-hero-copy">
          <p className="section-eyebrow">{site.designation}</p>
          <h1 className="home-hero-title">{site.name}</h1>
          <p className="home-hero-tagline">{site.tagline}</p>
          <p className="home-hero-description">{intro}</p>
          <div className="home-hero-actions">
            <Link className="button-primary" href="/creations">
              Explore the work
              <FiArrowDownRight aria-hidden="true" />
            </Link>
            <Link className="home-secondary-link" href="/about">
              About the author
            </Link>
          </div>
          <SocialLinks links={site.socialLinks} />
          <ul className="hero-stats">
            {stats.map((stat) => (
              <li className="hero-stat" key={stat.label}>
                <span className="hero-stat-value">
                  {formatCount(stat.value)}
                </span>
                <span className="hero-stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="home-hero-art">
          <div className="home-hero-image-frame">
            <ContentImage
              src={site.heroImage || site.profileImage}
              alt={`${site.name} — portrait`}
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
