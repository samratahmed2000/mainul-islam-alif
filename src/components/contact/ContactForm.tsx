"use client";

import { useState, type FormEvent } from "react";
import { validateContactForm } from "@/lib/validation";
import type { ContactFormData } from "@/types/contact";

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [status, setStatus] = useState("");

  function handleChange(
    field: keyof ContactFormData,
    value: string,
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("অনুগ্রহ করে ফর্মের ভুলগুলো ঠিক করে আবার চেষ্টা করুন।");
      return;
    }

    setStatus(
      "এটি একটি প্রদর্শনী ফর্ম। বার্তাটি পাঠানো হয়নি—যোগাযোগের জন্য ইমেইল বা ফোন ব্যবহার করুন।",
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <label className="form-field">
          <span>আপনার নাম</span>
          <input
            autoComplete="name"
            name="name"
            required
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "footer-name-error" : undefined}
            onChange={(event) => handleChange("name", event.target.value)}
          />
          {errors.name && (
            <span className="form-error" id="footer-name-error">
              {errors.name}
            </span>
          )}
        </label>
        <label className="form-field">
          <span>ইমেইল</span>
          <input
            autoComplete="email"
            name="email"
            type="email"
            required
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "footer-email-error" : undefined}
            onChange={(event) => handleChange("email", event.target.value)}
          />
          {errors.email && (
            <span className="form-error" id="footer-email-error">
              {errors.email}
            </span>
          )}
        </label>
        <label className="form-field">
          <span>ফোন</span>
          <input
            autoComplete="tel"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "footer-phone-error" : undefined}
            onChange={(event) => handleChange("phone", event.target.value)}
          />
          {errors.phone && (
            <span className="form-error" id="footer-phone-error">
              {errors.phone}
            </span>
          )}
        </label>
        <label className="form-field form-field-wide">
          <span>বার্তা</span>
          <textarea
            name="message"
            rows={3}
            required
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "footer-message-error" : undefined
            }
            onChange={(event) => handleChange("message", event.target.value)}
          />
          {errors.message && (
            <span className="form-error" id="footer-message-error">
              {errors.message}
            </span>
          )}
        </label>
      </div>
      <button className="button button-primary" type="submit">
        ফর্ম যাচাই করুন
      </button>
      {status && (
        <p className="form-status" role="status" aria-live="polite">
          {status}
        </p>
      )}
      <p className="form-notice">
        ফর্মটি এখনো কোনো সার্ভারের সঙ্গে সংযুক্ত নয়; এখানে বার্তা পাঠানো হয় না।
      </p>
    </form>
  );
}