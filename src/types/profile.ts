export interface ProfessionalJourney {
  readonly id: string;
  readonly title: string;
  readonly organization: string;
  readonly period: string;
  readonly description: string;
  readonly icon: string;
}

export interface Education {
  readonly id: string;
  readonly degree: string;
  readonly institution: string;
  readonly department: string;
  readonly year: string;
  readonly result: string;
  readonly icon: string;
}

export interface ProfileSection {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface Profile {
  readonly intro: string;
  readonly background: string;
  readonly personality: string;
  readonly professionalSummary: string;
  readonly writingAndMusicOverview: string;
  readonly professionalJourney: readonly ProfessionalJourney[];
  readonly education: readonly Education[];
  readonly creativeLife: readonly ProfileSection[];
  readonly interests: readonly ProfileSection[];
  readonly personalWords: readonly string[];
}