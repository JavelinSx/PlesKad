export interface SubService {
  n: string;
  d: string;
  w: string[];
  docs: string[];
}

export interface ServiceCategory {
  id: string;
  n: string;
  short: string;
  d: string;
  sub: SubService[];
}

export interface Feature {
  t: string;
  d: string;
}

export interface LawUpdate {
  date: string;
  t: string;
  d: string;
  src: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface GlossaryTerm {
  t: string;
  d: string;
}

export interface TeamMember {
  name: string;
  role: string;
  about: string;
}
