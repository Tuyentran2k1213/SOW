import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Terms as TermsType } from '../../types';
import './style.css';

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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sv' : 'en');
  };

  return (
    <div className="terms-container">
      {/* Background Image */}
      <div className="background-image" 
           style={{ backgroundImage: 'url(https://storage.123fakturera.se/public/wallpapers/sverige43.jpg)' }}>
      </div>

      {/* Header */}
      <header className="terms-header">
        <div className="header-content">
          {/* Hamburger Menu */}
          <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <div className="logo">
            <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" />
          </div>

          {/* Language Selector */}
          <div className="language-selector" onClick={toggleLanguage}>
            <span>{language === 'en' ? 'English' : 'Svenska'}</span>
            <img 
              src={language === 'en' 
                ? 'https://storage.123fakturere.no/public/flags/GB.png'
                : 'https://storage.123fakturere.no/public/flags/SE.png'
              } 
              alt={language === 'en' ? 'English' : 'Svenska'} 
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <nav>
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="terms-content">
        <div className="content-wrapper">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <h1 className="main-title">
                {language === 'en' ? 'Terms of Service' : 'Användarvillkor'}
              </h1>
              
              <div className="terms-sections">
                {terms.map((term) => (
                  <section key={term.id} className="term-section">
                    <h2>{term.title}</h2>
                    <p>{term.content}</p>
                  </section>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};