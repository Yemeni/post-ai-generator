import { LocalizedStrings } from './../LocalizedStrings';
import translationsData from './../translations.json';

describe('LocalizedStrings', () => {
  let localizedStrings: LocalizedStrings;

  beforeEach(() => {
    localizedStrings = new LocalizedStrings(translationsData, 'en'); // Create a new instance for each test
  });

  test('should return the correct translation for the default language', () => {
    expect(localizedStrings.getString('hello')).toBe(translationsData.hello.en);
  });

  test('should switch to a different language and return the correct translation', () => {
    localizedStrings.setLanguage('ar');
    expect(localizedStrings.getString('hello')).toBe(translationsData.hello.ar);
  });

  test('should throw an error for unsupported language', () => {
    expect(() => localizedStrings.setLanguage('fr')).toThrow("Language 'fr' is not supported.");
  });

  test('should throw an error for missing key', () => {
    expect(() => localizedStrings.getString('nonexistent_key')).toThrow("Key 'nonexistent_key' is not found in translations.");
  });

  test('should throw an error for missing translation in the current language', () => {
    const incompleteTranslations = {
      "incomplete_key": { en: "This is only in English" },
      "complete_key": { en: "This is in English", ar: "هذا بالعربي" }
    };

    // add translationsData to testStrings
    const mergedData = { ...translationsData, ...incompleteTranslations };

    const testStrings = new LocalizedStrings(mergedData, 'en');
    // add incompleteTranslations to testStrings


    testStrings.setLanguage('ar');
    expect(() => testStrings.getString('incomplete_key')).toThrow(
      "Translation for 'incomplete_key' in language 'ar' is missing."
    );
  });
});
