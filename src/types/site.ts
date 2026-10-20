export interface SocialLinks {
  readonly facebook: string;
  readonly youtube: string;
  readonly instagram: string;
  readonly whatsapp: string;
}

export interface ContactInfo {
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly availability: string;
}

export interface SiteSettings {
  readonly name: string;
  readonly designation: string;
  readonly tagline: string;
  readonly language: string;
  readonly description: string;
  readonly logo: string;
  readonly heroImage: string;
  readonly profileImage: string;
  readonly ctaImage: string;
  readonly socialLinks: SocialLinks;
  readonly contact: ContactInfo;
  readonly scheduleUrl: string;
  readonly currency: string;
}