import React, {useContext, useState} from 'react';
import '../assets/styles/Modal.css';
import { FaGoogle } from 'react-icons/fa';
import {AuthContext} from "../AuthContext.jsx";
import {useLanguage} from "../LanguageContext.jsx";
const LoginModal = ({ onClose, onSignupClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useContext(AuthContext);
    const { language, translations } = useLanguage();
    const t = translations[language];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t.loginFailed || 'Login failed');
            }
            login(data.user, data.token);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="modal show" id="loginModal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <div className="login-modal-header">
                    <h2 className="login-header">{t.login || 'Login'}</h2>
                </div>
                <div className="modal-body">
                    {error && <div className="error-message">{error}</div>}
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="loginEmail">{t.email || 'Email'}</label>
                            <input
                                type="email"
                                id="loginEmail"
                                placeholder={t.emailPlaceholder || 'Enter your email'}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="loginPassword">{t.password || 'Password'}</label>
                            <input
                                type="password"
                                id="loginPassword"
                                placeholder={t.passwordPlaceholder || 'Password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group remember-me">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">{t.rememberMe || 'Remember me'}</label>
                        </div>
                        <button type="submit" className="btn btn-full">{t.login || 'Login'}</button>
                    </form>

                    <div className="auth-divider">
                        <span>{t.or || 'OR'}</span>
                    </div>

                    <div className="social-login">
                        <button className="btn-google">
                            <FaGoogle />
                            {language === 'kurdish' ? 'چوونەژوورە بە گووگڵ' : 'Login with Google'}
                        </button>
                    </div>

                    <div className="auth-links">
                        <a href="#" id="forgotPassword">{t.forgotPassword || 'Forgot your password?'}</a>
                        <a href="#" id="goToSignup" onClick={(e) => {
                            e.preventDefault();
                            onSignupClick();
                        }}>{t.newRegistration || 'New registration'}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;