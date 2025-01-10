import { useState } from 'react';
import { localizedStrings } from './../localization/LocalizedStrings';

export const useLocalization = () => {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang: string) => {
    localizedStrings.setLanguage(lang);
    setLanguage(lang);
  };

  const t = (key: string) => localizedStrings.getString(key);

  return { t, setLanguage: changeLanguage, language };
};
