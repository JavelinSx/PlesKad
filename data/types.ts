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
  /** Короткая версия на 1 строку — тизер в ленте на Главной */
  summary: string;
  /**
   * Полная расшифровка простым языком для попапа.
   * Один элемент массива — обычный абзац (5-6 предложений).
   * Несколько элементов — нумерованный список шагов/пунктов.
   */
  details: string[];
  src: string;
  link?: string;
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
  photo?: string;
}
