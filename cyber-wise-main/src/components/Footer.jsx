import React from 'react';
import '../assets/styles/Footer.css';
import {useLanguage} from "../LanguageContext.jsx";
const Footer = () => {
    const {translations, language } = useLanguage();
    return (
        <footer>
            <div className="container">
                <p>{translations[language].footerText}</p>
                <ul>
                    <li><a href="#hero">{translations[language].homeLink}</a></li>
                    <li><a href="#game-chapters">{translations[language].gamesLink}</a></li>
                    <li><a href="#quiz-points">{translations[language].pointsLink}</a></li>
                    <li><a href="#about">{translations[language].aboutLink}</a></li>
                    <li><a href="#contact">{translations[language].contactLink}</a></li>
                </ul>
                <p className="copyright">{translations[language].copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;