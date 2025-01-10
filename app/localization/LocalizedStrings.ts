import translationsData from './translations.json';

interface Translations {
  [key: string]: {
    [language: string]: string;
  };
}

class LocalizedStrings {
  private translations: Translations;
  private currentLanguage: string;

  constructor(translations: Translations, defaultLanguage: string = 'en') {
    this.translations = translations;
    this.currentLanguage = defaultLanguage;
  }

  public setLanguage(language: string): void {
    if (!this.isValidLanguage(language)) {
      throw new Error(`Language '${language}' is not supported.`);
    }
    this.currentLanguage = language;
    console.log(`Language set to: ${language}`);
  }

  public getString(key: string): string {
    const localizedStrings = this.translations[key];
    if (!localizedStrings) {
      throw new Error(`Key '${key}' is not found in translations.`);
    }

    const translation = localizedStrings[this.currentLanguage];
    if (!translation) {
      throw new Error(`Translation for '${key}' in language '${this.currentLanguage}' is missing.`);
    }

    return translation;
  }

  private isValidLanguage(language: string): boolean {
    const languages = Object.keys(this.translations[Object.keys(this.translations)[0]]);
    return languages.includes(language);
  }
}

const localizedStrings = new LocalizedStrings(translationsData, 'en');

export { LocalizedStrings, localizedStrings }; // Export both the class and the instance
