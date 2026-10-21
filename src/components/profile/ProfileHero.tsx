import ContentImage from "@/components/ui/ContentImage";
import Container from "@/components/ui/Container";
import { getProfile, getSiteSettings } from "@/lib/data";
import { isPlaceholderText } from "@/lib/placeholder";

export default function ProfileHero() {
  const site = getSiteSettings();
  const profile = getProfile();
  const intro = isPlaceholderText(profile.intro)
    ? site.description
    : profile.intro;

  return (
    <section className="profile-hero">
      <Container className="profile-hero-grid">
        <div className="profile-hero-image-frame">
          <ContentImage
            src={site.profileImage}
            alt={`${site.name} — portrait`}
            sizes="(max-width: 48rem) 80vw, 25rem"
            className="profile-hero-image"
            fallback={
              <div className="profile-image-fallback" aria-hidden="true">
                <span className="profile-image-initial">
                  {site.name.charAt(0)}
                </span>
                <span>{site.designation}</span>
              </div>
            }
          />
        </div>
        <div className="profile-hero-copy">
          <p className="section-eyebrow">{site.designation}</p>
          <h1 className="profile-hero-title">{site.name}</h1>
          <p className="profile-hero-tagline">{site.tagline}</p>
          <p className="profile-hero-intro">{intro}</p>
        </div>
      </Container>
    </section>
  );
}
