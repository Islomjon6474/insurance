export interface Activity {
  id: number;
  name: string;
}

export interface CoverageDetails {
  medicine: number;
  accident: number;
  covid: number;
  evacuation: number;
  transportation: number;
  compensation: number;
}

export interface Program {
  id: number;
  name: string;
  liability: number | null;
  description?: string;
  coverages: CoverageDetails | null;
}

export interface Country {
  id: number;
  name: string;
  isInSchengen: number;
  programs: Program[];
}

export enum Coverage {
  Single = "single",
  Multiple = "multiple",
}

export interface UserData {
  countryData: Record<number, Country> | null;
  coverageType: Coverage;
  startDate: string | null;
  endDate: string | null;
  activityId: number | null;
  phone: string | null;
  programId: number | null;
}
