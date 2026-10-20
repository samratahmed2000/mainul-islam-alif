import ContentImage from "@/components/ui/ContentImage";
import Container from "@/components/ui/Container";
import { getProfile, getSiteSettings } from "@/lib/data";

export default function ProfileHero() {
  const site = getSiteSettings();
  const profile = getProfile();
  const isPlaceholder =
    profile.intro.trim() === "" || profile.intro.startsWith("এখানে");
  const intro = isPlaceholder ? site.description : profile.intro;

  return (
    <section className="profile-hero">
      <Container className="profile-hero-grid">
        <div className="profile-hero-image-frame">
          <ContentImage
            src={site.profileImage}
            alt={`${site.name} — পরিচিতি`}
            sizes="(max-width: 48rem) 80vw, 25rem"
            className="profile-hero-image"
            fallback={
              <div className="profile-image-fallback" aria-hidden="true">
                <span className="profile-image-initial">ম</span>
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