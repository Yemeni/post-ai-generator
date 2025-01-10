import { useEffect } from 'react';

const useDocumentDirection = (language: string) => {
  useEffect(() => {
    const htmlElement = document.documentElement;

    // Update the direction and language attributes
    htmlElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    htmlElement.setAttribute('lang', language);
  }, [language]); // Re-run when the language changes
};

export default useDocumentDirection;
