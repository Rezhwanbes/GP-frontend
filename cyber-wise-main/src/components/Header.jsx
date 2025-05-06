import React, {useContext} from 'react';
import '../assets/styles/Header.css';
import {AuthContext} from "../AuthContext.jsx";
import UserProfile from "../UserProfile.jsx";
import {useLanguage} from "../LanguageContext.jsx";
import LanguageDropdown from "../LanguageDropdown.jsx";
const Header = ({ onLoginClick, onSignupClick }) => {
    const {user, isLoading} = useContext(AuthContext)
    const {translations, language} = useLanguage();
    if (isLoading){
        return <div>Loading ...</div>
    }

    return (
        <header>
            <div className="container header-content">
                <div className="logo">{translations[language].cyber}<span>{translations[language].wise}</span></div>
                <nav>
                    <ul>
                        <li><a href="/">{translations[language].homeLink}</a></li>
                        <li><a href="/#game-chapters">{translations[language].gamesLink}</a></li>
                        <li><a href="/#quiz-points">{translations[language].pointsLink}</a></li>
                        <li><a href="/#about">{translations[language].aboutLink}</a></li>
                        <li><a href="/#contact">{translations[language].contactLink}</a></li>
                    </ul>
                </nav>

                <div className="auth-buttons">
                    {user ? (
                        <UserProfile/>
                    ):
                        <>
                            <button className="btn-login" onClick={onLoginClick}>{translations[language].login}</button>
                            <button className="btn-signup" onClick={onSignupClick}>{translations[language].register}</button>
                        </>
                    }
                    <LanguageDropdown/>
                </div>
            </div>
        </header>
    );
};

export default Header;