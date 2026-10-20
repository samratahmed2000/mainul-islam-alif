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
    errors.name = "আপনার নাম লিখুন।";
  }

  if (!email) {
    errors.email = "আপনার ইমেইল ঠিকানা লিখুন।";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
  }

  if (digitsOnlyPhone.length < 8 || digitsOnlyPhone.length > 15) {
    errors.phone = "৮ থেকে ১৫ সংখ্যার একটি বৈধ ফোন নম্বর লিখুন।";
  }

  if (!message) {
    errors.message = "আপনার বার্তা লিখুন।";
  }

  return errors;
}