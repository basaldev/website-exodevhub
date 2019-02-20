type Language = 'jp' | 'en';

export function getLanguage(): string {
  return (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'en';
}

export function setLanguage(language: Language) {
  if (typeof localStorage !== 'undefined') localStorage.setItem('language', language);
}
