import { useState, useEffect } from 'react';
import { localizedStrings } from './../localization/LocalizedStrings';

export const useLocalization = () => {
  const [language, setLanguageState] = useState(localizedStrings['currentLanguage']); // React state for language
  const [_, forceRerender] = useState(0); // Dummy state to trigger re-render

  const setLanguage = (language: string) => {
    localizedStrings.setLanguage(language); // Update the language
    setLanguageState(language); // Update React state
  };

  useEffect(() => {
    const handleLanguageChange = () => forceRerender((prev) => prev + 1); // Trigger re-render

    localizedStrings.subscribe(handleLanguageChange);

    return () => {
      localizedStrings.unsubscribe(handleLanguageChange); // Cleanup on unmount
    };
  }, []);

  const t = (key: string) => localizedStrings.getString(key); // Translate strings dynamically

  return { t, setLanguage, language };
};
