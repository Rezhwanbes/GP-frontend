import React from 'react';
import '../assets/styles/About.css';
import {useLanguage} from "../LanguageContext.jsx";
const About = () => {
    const {translations, language} = useLanguage();
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="section-title">
                    <h2>{translations[language].aboutTitle}</h2>
                    <p>{translations[language].aboutSubtitle}</p>
                </div>

                <div className="about-content">
                    <div className="about-image">
                        <img src="../assets/cyber%20wise.png" alt="سایبێر وایز لۆگۆ" />
                    </div>
                    <div className="about-text">
                        <h3>{translations[language].whyTitle}</h3>
                        <p>{translations[language].whyContent}</p>

                        <h3>{translations[language].goalTitle}</h3>
                        <p>{translations[language].goalContent}</p>

                        <h3>{translations[language].teamTitle}</h3>
                        <p>{translations[language].teamContent}</p>

                        <div className="about-buttons">
                            <a href="#contact" className="btn">{translations[language].contactBtn}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;