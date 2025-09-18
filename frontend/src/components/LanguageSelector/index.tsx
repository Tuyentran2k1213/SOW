import { Dispatch, FC, memo, useState } from "react";

type LanguageSelectorProps = {
    language: 'en' | 'sv'
    onChangeLanguage: Dispatch<'en' | 'sv'>
    className?: string
}

const LanguageSelector: FC<LanguageSelectorProps> = ({ language, onChangeLanguage, className }) => {
    const [languageOpen, setLanguageOpen] = useState(false);
    const selectLanguage = (languages:"en" | "sv") => {
        onChangeLanguage(languages);
      };
    
      const handleToggleOpenLanguage = () => {
        setLanguageOpen(prev => !prev)
      }

    return <div className="language-selector menu-item" onClick={handleToggleOpenLanguage}>
    <nav className={`language-list ${languageOpen ? 'open' : ''}`}>
    <div onClick={() => selectLanguage('en')} className='language-option'>
      <span>English</span>
      <img 
      src='https://storage.123fakturere.no/public/flags/GB.png' 
      alt='English'
    />
    </div>
    <div onClick={() => selectLanguage('sv')} className='language-option'>
      <span>Svenska</span>
      <img 
      src='https://storage.123fakturere.no/public/flags/SE.png' 
      alt='Svenska'
    />
    </div>
    </nav>
    <span>{language === 'en' ? 'English' : 'Svenska'}</span>
    <img 
      src={language === 'en' 
        ? 'https://storage.123fakturere.no/public/flags/GB.png'
        : 'https://storage.123fakturere.no/public/flags/SE.png'
      } 
      alt={language === 'en' ? 'English' : 'Svenska'} 
    />
    <div className='language-option'>

    </div>
  </div>
}

export default memo(LanguageSelector)