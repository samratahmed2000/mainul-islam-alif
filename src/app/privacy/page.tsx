import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How this website's demo contact form works and how information is handled.",
  alternates: {
    canonical: getCanonicalUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <Container className="privacy-page">
      <header className="privacy-page-heading">
        <p className="section-eyebrow">Privacy</p>
        <h1 className="section-heading">About your privacy</h1>
        <p className="section-description">
          The contact form on this site is currently a demonstration only.
        </p>
      </header>
      <div className="privacy-content">
        <section aria-labelledby="form-data-heading">
          <h2 id="form-data-heading">Information entered in the contact form</h2>
          <p>
            The name, email, phone number, and message you type into the form
            are used only to validate your input on this page. The form does not
            send information to any server or email service, and the site does
            not store the contents of the form. Your input exists only
            temporarily in the page.
          </p>
          <p>
            Please do not enter sensitive or confidential information until the
            form is connected. To get in touch, use the email address or phone
            number shown on the site; that communication channel may have its
            own privacy policy.
          </p>
        </section>
        <section aria-labelledby="future-changes-heading">
          <h2 id="future-changes-heading">Changes</h2>
          <p>
            This page will be updated if the contact form or the way information
            is handled changes. There is currently no working way to submit the
            form.
          </p>
        </section>
      </div>
    </Container>
  );
}
