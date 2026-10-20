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
            <p className="section-eyebrow">যোগাযোগ</p>
            <h2 className="home-cta-title">কথা ও ভাবনা ভাগ করে নিন</h2>
            <p className="home-cta-description">
              কোনো প্রশ্ন, মতামত বা সৃষ্টিকর্ম নিয়ে কথা বলতে যোগাযোগ করুন।
            </p>
            {isExternal ? (
              <a
                className="button-primary"
                href={scheduleHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                সময় নির্ধারণ করুন
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ) : (
              <Link className="button-primary" href={scheduleHref}>
                যোগাযোগ করুন
                <FiArrowUpRight aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}