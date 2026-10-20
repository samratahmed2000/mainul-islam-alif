import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import type { SocialLinks as SocialLinksData } from "@/types/site";

interface SocialLinksProps {
  readonly links: SocialLinksData;
}

const SOCIAL_NETWORKS = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
] as const;

function getSocialHref(
  key: (typeof SOCIAL_NETWORKS)[number]["key"],
  value: string,
): string | undefined {
  if (!value.trim()) {
    return undefined;
  }

  if (key === "whatsapp" && !/^https?:\/\//i.test(value)) {
    const phone = value.replace(/\D/g, "");
    return phone.length >= 8 ? `https://wa.me/${phone}` : undefined;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

export default function SocialLinks({ links }: SocialLinksProps) {
  const availableLinks = SOCIAL_NETWORKS.flatMap(({ key, label, Icon }) => {
    const href = getSocialHref(key, links[key]);
    return href ? [{ key, label, Icon, href }] : [];
  });

  if (availableLinks.length === 0) {
    return null;
  }

  return (
    <nav className="social-links" aria-label="সামাজিক যোগাযোগমাধ্যম">
      {availableLinks.map(({ key, label, Icon, href }) => (
        <a
          key={key}
          className="social-link"
          href={href}
          aria-label={`${label}-এ দেখুন`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon aria-hidden="true" focusable="false" />
        </a>
      ))}
    </nav>
  );
}