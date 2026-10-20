import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import SocialLinks from "@/components/layout/SocialLinks";
import Container from "@/components/ui/Container";
import { getSafeEmailHref, getSafePhoneHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export default function Footer() {
  const { name, designation, description, socialLinks, contact } =
    getSiteSettings();
  const emailHref = getSafeEmailHref(contact.email);
  const phoneHref = getSafePhoneHref(contact.phone);
  const contactMethods = [
    emailHref
      ? {
          label: "ইমেইল",
          href: emailHref,
          value: contact.email.trim(),
        }
      : undefined,
    phoneHref
      ? {
          label: "ফোন",
          href: phoneHref,
          value: contact.phone.trim(),
        }
      : undefined,
  ].filter((item) => item !== undefined);

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer-inner">
          <div>
            <p className="footer-brand">{name}</p>
            <p className="footer-designation">{designation}</p>
            <p className="footer-description">{description}</p>
            <div className="mt-5">
              <SocialLinks links={socialLinks} />
            </div>
          </div>
          <div className="footer-form-column">
            <h2 className="footer-contact-title">যোগাযোগ করুন</h2>
            <p className="footer-form-description">
              নিচের ফর্মটি প্রদর্শনীর জন্য; বার্তা পাঠাতে সরাসরি যোগাযোগের তথ্য ব্যবহার করুন।
            </p>
            <ContactForm />
            <div className="footer-contact-list footer-direct-contact">
              {contactMethods.map((item) => (
                <a
                  key={item.label}
                  className="footer-contact-link"
                  href={item.href}
                >
                  <span className="footer-contact-label">{item.label}: </span>
                  {item.value}
                </a>
              ))}
              {contact.address.trim() && (
                <p className="footer-description">{contact.address.trim()}</p>
              )}
              <Link className="footer-contact-link mt-2" href="/contact">
                যোগাযোগের বিস্তারিত দেখুন
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {name}</span>
          <Link className="footer-contact-link" href="/privacy">
            গোপনীয়তা নীতি
          </Link>
        </div>
      </Container>
    </footer>
  );
}