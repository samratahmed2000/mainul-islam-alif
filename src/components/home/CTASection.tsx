import Link from "next/link";
import { FiArrowUpRight, FiMessageCircle } from "react-icons/fi";
import ContentImage from "@/components/ui/ContentImage";
import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/data";

function isWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export default function CTASection() {
  const site = getSiteSettings();
  const scheduleHref = isWebUrl(site.scheduleUrl)
    ? site.scheduleUrl
    : "/contact";
  const isExternal = scheduleHref !== "/contact";

  return (
    <section className="home-cta-section">
      <Container>
        <div className="home-cta">
          <ContentImage
            src={site.ctaImage}
            alt=""
            sizes="(max-width: 48rem) 92vw, 76rem"
            className="home-cta-image"
            fallback={
              <div className="home-cta-image-fallback" aria-hidden="true">
                <span className="cta-glow cta-glow-one" />
                <span className="cta-glow cta-glow-two" />
              </div>
            }
          />
          <div className="home-cta-overlay" />
          <div className="home-cta-content">
            <span className="home-cta-icon" aria-hidden="true">
              <FiMessageCircle />
            </span>
            <p className="section-eyebrow">Contact</p>
            <h2 className="home-cta-title">Have a thought to share?</h2>
            <p className="home-cta-description">
              Questions, feedback, or a note about the work — get in touch and
              start a conversation.
            </p>
            {isExternal ? (
              <a
                className="button-primary"
                href={scheduleHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a call
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ) : (
              <Link className="button-primary" href={scheduleHref}>
                Contact me
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}