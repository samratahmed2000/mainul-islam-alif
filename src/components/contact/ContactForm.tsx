"use client";

import { useId, useState, type FormEvent } from "react";
import { validateContactForm } from "@/lib/validation";
import type { ContactFormData } from "@/types/contact";

const INITIAL_FORM: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const formId = useId();
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
      setStatus("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus(
      "This is a demo form. No message was sent — use the email or phone shown to get in touch.",
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <label className="form-field">
          <span>Your name</span>
          <input
            autoComplete="name"
            name="name"
            required
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            onChange={(event) => handleChange("name", event.target.value)}
          />
          {errors.name && (
            <span className="form-error" id={`${formId}-name-error`}>
              {errors.name}
            </span>
          )}
        </label>
        <label className="form-field">
          <span>Email</span>
          <input
            autoComplete="email"
            name="email"
            type="email"
            required
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            onChange={(event) => handleChange("email", event.target.value)}
          />
          {errors.email && (
            <span className="form-error" id={`${formId}-email-error`}>
              {errors.email}
            </span>
          )}
        </label>
        <label className="form-field">
          <span>Phone</span>
          <input
            autoComplete="tel"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            onChange={(event) => handleChange("phone", event.target.value)}
          />
          {errors.phone && (
            <span className="form-error" id={`${formId}-phone-error`}>
              {errors.phone}
            </span>
          )}
        </label>
        <label className="form-field form-field-wide">
          <span>Message</span>
          <textarea
            name="message"
            rows={3}
            required
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${formId}-message-error` : undefined
            }
            onChange={(event) => handleChange("message", event.target.value)}
          />
          {errors.message && (
            <span className="form-error" id={`${formId}-message-error`}>
              {errors.message}
            </span>
          )}
        </label>
      </div>
      <button className="button button-primary" type="submit">
        Validate form
      </button>
      {status && (
        <p className="form-status" role="status" aria-live="polite">
          {status}
        </p>
      )}
      <p className="form-notice">
        This form is not connected to a server yet; nothing is sent from here.
      </p>
    </form>
  );
}