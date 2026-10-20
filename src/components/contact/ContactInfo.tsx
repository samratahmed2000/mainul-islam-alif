import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import SocialLinks from "@/components/layout/SocialLinks";
import { getSafeEmailHref, getSafePhoneHref } from "@/lib/contact";
import { getSiteSettings } from "@/lib/data";

export default function ContactInfo() {
  const { contact, socialLinks } = getSiteSettings();
  const emailHref = getSafeEmailHref(contact.email);
  const phoneHref = getSafePhoneHref(contact.phone);

  return (
    <section className="contact-info-panel" aria-labelledby="contact-info-heading">
      <h2 id="contact-info-heading">সরাসরি যোগাযোগ</h2>
      <ul className="contact-info-list">
        {emailHref && (
          <li>
            <FiMail aria-hidden="true" focusable="false" />
            <div>
              <span>ইমেইল</span>
              <a href={emailHref}>{contact.email.trim()}</a>
            </div>
          </li>
        )}
        {phoneHref && (
          <li>
            <FiPhone aria-hidden="true" focusable="false" />
            <div>
              <span>ফোন</span>
              <a href={phoneHref}>{contact.phone.trim()}</a>
            </div>
          </li>
        )}
        {contact.address.trim() && (
          <li>
            <FiMapPin aria-hidden="true" focusable="false" />
            <div>
              <span>ঠিকানা</span>
              <p>{contact.address.trim()}</p>
            </div>
          </li>
        )}
      </ul>
      {contact.availability.trim() && (
        <p className="contact-availability">{contact.availability.trim()}</p>
      )}
      <SocialLinks links={socialLinks} />
      {!emailHref && !phoneHref && !contact.address.trim() && (
        <p className="contact-info-empty">
          যোগাযোগের তথ্য যোগ করা হলে এখানে দেখা যাবে।
        </p>
      )}
    </section>
  );
}