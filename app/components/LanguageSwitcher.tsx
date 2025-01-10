import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import styles from './LanguageSwitcher.module.css';
import useDocumentDirection from '../hooks/useDocumentDirection';

const LanguageSwitcher = () => {
  const { setLanguage, language } = useLocalization();
  useDocumentDirection(language);


  return (
    <div className={styles.languageSelector}>
      <button onClick={() => setLanguage('en')} className={styles.button}>
        English
      </button>
      <button onClick={() => setLanguage('ar')} className={styles.button}>
        العربية
      </button>
      <button onClick={() => setLanguage('de')} className={styles.button}>
        Deutsch
      </button>
    </div>
  );
};

export default LanguageSwitcher;
