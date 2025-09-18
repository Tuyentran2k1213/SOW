import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Terms as TermsType } from '../../types';
import './style.css';
import LanguageSelector from '../../components/LanguageSelector';
import AnimatedMenuIcon from '../../components/ui/AnimatedMenuIcon';
import { menuList } from '../../constants';

export const Terms: React.FC = () => {
  const [terms, setTerms] = useState<TermsType[]>([]);
  const [language, setLanguage] = useState<'en' | 'sv'>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    loadTerms();
  }, [language]);

  const loadTerms = async () => {
    try {
      setLoading(true);
      const data = await api.getTerms(language);
      setTerms(data);
    } catch (error) {
      console.error('Failed to load terms:', error);
    } finally {
      setLoading(false);
    }
  };
console.log('terms', terms);

  return (
    <div className="terms-container">
      <div className="background-image">
      </div>

     <nav className='nav-header'>
     <header className="terms-header">
        <section className="header-content">
          <div className="logo">
            <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" />
          </div>
          <AnimatedMenuIcon className='burger-btn' isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)}/>
          <div className='header-menu'>
           {menuList.map((item) => (<a className='menu-item' href={item.href} key={item.href}>
            {item.label}
           </a>))}
<LanguageSelector language={language} onChangeLanguage={setLanguage} />
          </div>
        </section>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <nav>
          {menuList.map((item) => (<a className='' href={item.href} key={item.href}>
            {item.label}
           </a>))}
          </nav>
        </div>
      </header>
     </nav>

      <main className="terms-content">
      <h1 className="main-title">
                {language === 'en' ? 'Terms' : 'Användarvillkor'}
              </h1>
              <div className='main-title-inner'>
              <button className='main-title-btn'>
              Close and Go Back
              </button>
              </div>
        <div className="content-wrapper">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>              
              <div className="terms-sections">
                {terms.map((item) => <div dangerouslySetInnerHTML={{ __html: item.content }}></div> )}
              </div>
            </>
          )}
        </div>
        <div className='main-title-inner'>
              <button className='main-title-btn'>
              Close and Go Back
              </button>
              </div>
      </main>
    </div>
  );
};