export function getSafeEmailHref(email: string): string | undefined {
  const normalizedEmail = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ? `mailto:${normalizedEmail}`
    : undefined;
}

export function getSafePhoneHref(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15
    ? `tel:+${digits}`
    : undefined;
}
