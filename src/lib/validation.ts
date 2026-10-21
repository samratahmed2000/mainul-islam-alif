import type { ContactFormData } from "@/types/contact";

export type ContactFormErrors = Partial<
  Record<keyof ContactFormData, string>
>;

export function validateContactForm(
  data: ContactFormData,
): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const digitsOnlyPhone = data.phone.replace(/\D/g, "");
  const message = data.message.trim();

  if (!name) {
    errors.name = "Enter your name.";
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (digitsOnlyPhone.length < 8 || digitsOnlyPhone.length > 15) {
    errors.phone = "Enter a valid phone number with 8 to 15 digits.";
  }

  if (!message) {
    errors.message = "Write your message.";
  }

  return errors;
}
