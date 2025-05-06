// src/components/LanguageDropdown.jsx
import React from 'react';
import {useLanguage} from "./LanguageContext.jsx";
const LanguageDropdown = () => {
    const {translations, language, setLanguage } = useLanguage();
    return (
        <div className="language-dropdown">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
            >
                <option value="kurdish">{translations[language].kurdish}</option>
                <option value="english">{translations[language].english}</option>
            </select>
        </div>
    );
};

export default LanguageDropdown;