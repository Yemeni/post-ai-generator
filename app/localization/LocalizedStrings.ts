import translationsData from './translations.json';

interface Translations {
  [key: string]: {
    [language: string]: string;
  };
}

class LocalizedStrings {
  private translations: Translations;
  private currentLanguage: string;
  private listeners: (() => void)[] = []; // Listeners to notify React components

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
    this.notifyListeners(); // Notify all listeners
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

  public subscribe(listener: () => void): void {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: () => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }

  private isValidLanguage(language: string): boolean {
    const languages = Object.keys(this.translations[Object.keys(this.translations)[0]]);
    return languages.includes(language);
  }
}

const localizedStrings = new LocalizedStrings(translationsData, 'en');

export { LocalizedStrings, localizedStrings };
