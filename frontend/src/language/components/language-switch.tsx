import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Language } from '../types';

export const LanguageSwitch = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.ENGLISH);

  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex ">
      <div
        className="cursor-pointer bg-gray-300 px-1 rounded-md text-2xl shadow-md select-none"
        onClick={() =>
          setCurrentLanguage(() => {
            if (currentLanguage === Language.THAI) {
              changeLanguage('en');
              return Language.ENGLISH;
            } else {
              changeLanguage('th');
              return Language.THAI;
            }
          })
        }
      >
        {currentLanguage}
      </div>
    </div>
  );
};
