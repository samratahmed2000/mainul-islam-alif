import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

const site = getSiteSettings();

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description: `${site.name}-এর সঙ্গে যোগাযোগের তথ্য ও প্রদর্শনী যোগাযোগ ফর্ম।`,
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <Container className="contact-page">
      <header className="contact-page-heading">
        <p className="section-eyebrow">যোগাযোগ</p>
        <h1 className="section-heading">আপনার কথা জানাতে পারেন</h1>
        <p className="section-description">
          সরাসরি যোগাযোগের তথ্য ব্যবহার করুন। নিচের ফর্মটি বর্তমানে প্রদর্শনীর
          জন্য; এটি কোনো বার্তা পাঠায় না।
        </p>
      </header>
      <div className="contact-page-grid">
        <ContactInfo />
        <section
          className="contact-form-panel"
          aria-labelledby="contact-form-heading"
        >
          <h2 id="contact-form-heading">প্রদর্শনী ফর্ম</h2>
          <p>
            ফর্মটি যাচাই করা হলেও বার্তা সার্ভারে পাঠানো বা সংরক্ষণ করা হয় না।
            যোগাযোগের জন্য ইমেইল বা ফোন ব্যবহার করুন।
          </p>
          <ContactForm />
        </section>
      </div>
    </Container>
  );
}
