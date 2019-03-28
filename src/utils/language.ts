export type Language = string;

export function getLanguage(): Language {

  return (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'en';
}

export function setLanguage(language: Language) {
  if (typeof localStorage !== 'undefined') localStorage.setItem('language', language);
}
