import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

const site = getSiteSettings();

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact details and demo contact form for ${site.name}.`,
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <Container className="contact-page">
      <header className="contact-page-heading">
        <p className="section-eyebrow">Contact</p>
        <h1 className="section-heading">I would love to hear from you</h1>
        <p className="section-description">
          Use the direct contact details for a real conversation. The form below
          is currently a demo and does not send messages.
        </p>
      </header>
      <div className="contact-page-grid">
        <ContactInfo />
        <section
          className="contact-form-panel"
          aria-labelledby="contact-form-heading"
        >
          <h2 id="contact-form-heading">Demo form</h2>
          <p>
            The form validates your input in the browser, but nothing is sent or
            stored on a server. Please use the email or phone number instead.
          </p>
          <ContactForm />
        </section>
      </div>
    </Container>
  );
}
