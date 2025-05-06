import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import './assets/styles/UserProfile.css'
import {useLanguage} from "./LanguageContext.jsx";
const UserProfile = () => {
    const { user, logout } = useContext(AuthContext);
    const {translations, language} = useLanguage();
    return (
        <div className="user-profile">
            <span className="user-name">{user.name}</span>
            <button onClick={logout} className="logout-button">
                {translations[language].logout}
            </button>
        </div>
    );
};

export default UserProfile;