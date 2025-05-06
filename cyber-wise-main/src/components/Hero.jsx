import React from 'react';
import '../assets/styles/Hero.css';
import {useLanguage} from "../LanguageContext.jsx";
const Hero = () => {
    const {translations, language} = useLanguage();
    return (
        <section className="hero" id="hero">
            <div className=" hero-content">
                <h1 className="hero-title">{translations[language].cyber} {translations[language].wise}</h1>
                <p>{translations[language].heroSubTitle}</p>
                <a href="#game-chapters" className="btn-start-game">{translations[language].startGame}</a>
            </div>
        </section>
    );
};

export default Hero;