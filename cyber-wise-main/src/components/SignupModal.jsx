import React, {useContext, useState} from 'react';
import '../assets/styles/Modal.css';
import { FaGoogle } from 'react-icons/fa';
import {AuthContext} from "../AuthContext.jsx";
import {useLanguage} from "../LanguageContext.jsx";

const SignupModal = ({ onClose, onLoginClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const { language, translations } = useLanguage();
    const t = translations[language];

    const validateForm = () => {
        if (!name.trim()) {
            setError(t.pleaseEnterName || 'Please enter your name');
            return false;
        }

        if (!email.trim()) {
            setError(t.pleaseEnterEmail || 'Please enter your email');
            return false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError(t.invalidEmail || 'Invalid email format');
            return false;
        }

        if (!password) {
            setError(t.pleaseEnterPassword || 'Please enter password');
            return false;
        } else if (password.length < 8) {
            setError(t.passwordMinLength || 'Password must be at least 8 characters');
            return false;
        }

        if (password !== passwordConfirm) {
            setError(t.passwordsDontMatch || "Passwords don't match");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    passwordConfirm
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || t.signupFailed || 'Signup failed');
            }

            login(data.user, data.token);
            onClose();
        } catch (err) {
            setError(err.message || t.signupError || 'An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal show" id="signupModal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <div className="login-modal-header">
                    <h2 className="login-header">{t.register || 'Register'}</h2>
                </div>
                <div className="modal-body">
                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i> {error}
                        </div>
                    )}

                    <form id="signupForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="signupName">{t.name || 'Name'}</label>
                            <input
                                type="text"
                                id="signupName"
                                placeholder={t.fullName || 'Full name'}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupEmail">{t.email || 'Email'}</label>
                            <input
                                type="email"
                                id="signupEmail"
                                placeholder={t.emailPlaceholder || 'Enter your email'}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupPassword">{t.password || 'Password'}</label>
                            <input
                                type="password"
                                id="signupPassword"
                                placeholder={language === 'kurdish' ? 'کەمتر نەبێت لە ٨ پیت' : 'At least 8 characters'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="signupPasswordConfirm">{t.confirmPassword || 'Confirm Password'}</label>
                            <input
                                type="password"
                                id="signupPasswordConfirm"
                                placeholder={language === 'kurdish' ? 'وشەی نهێنی دووبارە بنووسەوە' : 'Re-enter your password'}
                                required
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group terms-privacy">
                            <input
                                type="checkbox"
                                id="termsAgree"
                                required
                                disabled={isLoading}
                            />
                            <label htmlFor="termsAgree">
                                {language === 'kurdish' ? (
                                    <>ڕازیم بە <a href="#">مەرجەکانی بەکارهێنان</a> و <a href="#">سیاسەتی تایبەتمەندی</a></>
                                ) : (
                                    <>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></>
                                )}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> {t.loading || 'Loading...'}
                                </>
                            ) : t.register || 'Register'}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>{t.or || 'OR'}</span>
                    </div>

                    <div className="social-login">
                        <button
                            className="btn-google"
                            type="button"
                            disabled={isLoading}
                        >
                            <FaGoogle />
                            {language === 'kurdish' ? 'خۆتۆمارکردن بە گووگڵ' : 'Sign up with Google'}
                        </button>
                    </div>

                    <div className="auth-links">
                        <a
                            href="#"
                            id="goToLogin"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!isLoading) onLoginClick();
                            }}
                        >
                            {t.alreadyHaveAccount || 'Already have an account?'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupModal;