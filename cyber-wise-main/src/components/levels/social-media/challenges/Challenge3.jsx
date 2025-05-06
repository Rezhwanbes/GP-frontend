import React, { useState } from 'react';
import {useLanguage} from "../../../../LanguageContext.jsx";

const Challenge3 = ({ updateScore, goToNextChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [passwordChecked, setPasswordChecked] = useState(false);

    // Password requirements
    const requirements = [
        {
            id: 'length',
            label: language === 'kurdish' ? 'لانی کەم ١٢ پیت' : 'At least 12 characters',
            validator: (pwd) => pwd.length >= 12
        },
        {
            id: 'uppercase',
            label: language === 'kurdish' ? 'پیتی گەورە' : 'Uppercase letter',
            validator: (pwd) => /[A-Z]/.test(pwd)
        },
        {
            id: 'lowercase',
            label: language === 'kurdish' ? 'پیتی بچووک' : 'Lowercase letter',
            validator: (pwd) => /[a-z]/.test(pwd)
        },
        {
            id: 'number',
            label: language === 'kurdish' ? 'ژمارە' : 'Number',
            validator: (pwd) => /[0-9]/.test(pwd)
        },
        {
            id: 'special',
            label: language === 'kurdish' ? 'هێمای تایبەت (!@#$%^&*)' : 'Special character (!@#$%^&*)',
            validator: (pwd) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)
        },
        {
            id: 'notCommon',
            label: language === 'kurdish' ? 'وشەی نهێنی باو نەبێت' : 'Not a common password',
            validator: (pwd) => !isCommonPassword(pwd)
        }
    ];

    const isCommonPassword = (pwd) => {
        const commonPasswords = ['password', 'password123', '123456', 'qwerty', 'admin', 'welcome', 'login'];
        return commonPasswords.includes(pwd.toLowerCase());
    };

    const validatePassword = () => {
        const results = requirements.map(req => ({
            ...req,
            passed: req.validator(password)
        }));

        const isStrong = results.every(req => req.passed);
        setPasswordChecked(true);

        if (isStrong) {
            setModalContent({
                title: language === 'kurdish' ? 'باش کرا!' : 'Well done!',
                icon: 'check-circle',
                message: language === 'kurdish'
                    ? 'تۆ وشەی نهێنیەکی بەهێزت دروست کرد کە:'
                    : 'You created a strong password that:',
                details: results.map(req => req.label),
                buttonText: language === 'kurdish' ? 'تەواوکردنی ئاست' : 'Complete Level',
                isSuccess: true
            });
            updateScore(25);
        } else {
            const failedRequirements = results.filter(req => !req.passed).map(req => req.label);

            setModalContent({
                title: language === 'kurdish' ? 'پێویستە باشتر بکرێت' : 'Needs improvement',
                icon: 'times-circle',
                message: language === 'kurdish'
                    ? 'وشەی نهێنیەکەت پێویستی بەم گۆڕانکاریانە هەیە:'
                    : 'Your password needs these improvements:',
                details: failedRequirements,
                buttonText: language === 'kurdish' ? 'هەوڵدانەوە' : 'Try Again',
                isSuccess: false
            });
        }
        setShowModal(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const generateStrongPassword = () => {
        const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const lowercase = 'abcdefghijkmnopqrstuvwxyz';
        const numbers = '123456789';
        const special = '!@#$%^&*()_+=-';

        let newPassword = '';

        // Add one of each required character type
        newPassword += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        newPassword += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        newPassword += numbers.charAt(Math.floor(Math.random() * numbers.length));
        newPassword += special.charAt(Math.floor(Math.random() * special.length));

        // Add remaining characters randomly
        const allChars = uppercase + lowercase + numbers + special;
        for (let i = 0; i < 8; i++) {
            newPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Shuffle the password
        newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');

        setPassword(newPassword);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (modalContent.isSuccess) {
            goToNextChallenge(4);
        }
    };

    const showPasswordTips = () => {
        setModalContent({
            title: language === 'kurdish' ? 'ئامۆژگاری دروستکردنی وشەی نهێنی' : 'Password Creation Tips',
            icon: 'lightbulb',
            message: language === 'kurdish'
                ? 'چۆن وشەی نهێنی بەهێز دروست بکەین:'
                : 'How to create strong passwords:',
            details: language === 'kurdish' ? [
                'ڕستەی نهێنی بەکاربهێنە لەجیاتی تەنها وشە',
                'تێکەڵەیەک لە پیت، ژمارە و هێما بەکاربهێنە',
                'وشەی نهێنی جیاواز بۆ هەژمارە جیاوازەکان بەکاربهێنە',
                'زانیاری کەسی بەکارمەهێنە',
                'بیرکەرەوەی وشەی نهێنی بەکاربهێنە'
            ] : [
                'Use passphrases instead of single words',
                'Mix letters, numbers and special characters',
                'Use different passwords for different accounts',
                'Avoid personal information',
                'Consider using a password manager'
            ],
            buttonText: language === 'kurdish' ? 'تێگەیشتم' : 'Got it',
            isSuccess: false
        });
        setShowModal(true);
    };

    // Calculate password strength
    const strengthScore = requirements.reduce((score, req) =>
        score + (req.validator(password) ? 1 : 0), 0);

    const strengthClass = strengthScore <= 2 ? 'weak' :
        strengthScore <= 4 ? 'medium' : 'strong';
    const strengthText = strengthScore <= 2 ? (language === 'kurdish' ? 'هێز: لاواز' : 'Strength: Weak') :
        strengthScore <= 4 ? (language === 'kurdish' ? 'هێز: مامناوەند' : 'Strength: Medium') :
            (language === 'kurdish' ? 'هێز: بەهێز' : 'Strength: Strong');

    return (
        <div className="challenge-container" id="challenge3">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: دروستکردنی وشەی نهێنی بەهێز' : 'Challenge 3: Creating a Strong Password'}</h3>
            <p className="challenge-intro">
                {language === 'kurdish'
                    ? 'سارا دەیەوێت وشەی نهێنی هەژمارەکانی بەهێزتر بکات. یارمەتی بدە بۆ دروستکردنی وشەی نهێنی بەهێز.'
                    : 'Sara wants to strengthen her account passwords. Help her create a strong password.'}
            </p>

            <div className="password-checker">
                <div className="password-input-container">
                    <label htmlFor="passwordInput">
                        {language === 'kurdish' ? 'وشەی نهێنی نوێ:' : 'New password:'}
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="passwordInput"
                            placeholder={language === 'kurdish' ? "وشەی نهێنیەک بنووسە" : "Enter password..."}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn-toggle-password"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
                        </button>
                    </div>
                </div>

                <div className="password-strength">
                    <div className="strength-bar">
                        <div
                            className={`strength-progress ${strengthClass}`}
                            style={{ width: `${(strengthScore / requirements.length) * 100}%` }}
                        ></div>
                    </div>
                    <div className="strength-text">{strengthText}</div>
                </div>

                <div className="password-requirements">
                    <h4>{language === 'kurdish' ? 'پێویستیەکانی وشەی نهێنی:' : 'Password requirements:'}</h4>
                    <ul>
                        {requirements.map((req) => (
                            <li
                                key={req.id}
                                className={`requirement ${req.validator(password) ? 'passed' : 'failed'}`}
                            >
                                <i className={`fas fa-${req.validator(password) ? 'check' : 'times'}-circle`}></i>
                                {req.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn btn-secondary" onClick={showPasswordTips}>
                    <i className="fas fa-question-circle"></i> {language === 'kurdish' ? 'ئامۆژگاری' : 'Tips'}
                </button>
                <button className="btn btn-secondary" onClick={generateStrongPassword}>
                    <i className="fas fa-random"></i> {language === 'kurdish' ? 'دروستکردنی پێشنیار' : 'Generate'}
                </button>
                <button
                    className={`btn btn-check ${passwordChecked ? 'checked' : ''}`}
                    onClick={validatePassword}
                >
                    {passwordChecked ? (
                        <><i className="fas fa-check"></i> {language === 'kurdish' ? 'پشکنینی دووبارە' : 'Check Again'}</>
                    ) : (
                        <><i className="fas fa-shield-alt"></i> {language === 'kurdish' ? 'پشکنینی وشەی نهێنی' : 'Check Password'}</>
                    )}
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className={`modal-header ${modalContent.isSuccess ? 'success' : 'warning'}`}>
                            <i className={`fas fa-${modalContent.icon}`}></i>
                            <h3>{modalContent.title}</h3>
                        </div>
                        <div className="modal-body">
                            <p>{modalContent.message}</p>
                            {modalContent.details && modalContent.details.length > 0 && (
                                <ul className="modal-details">
                                    {modalContent.details.map((item, index) => (
                                        <li key={index}>
                                            <i className={`fas fa-${modalContent.isSuccess ? 'check' : 'exclamation'}-circle`}></i>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                className={`btn ${modalContent.isSuccess ? 'btn-success' : 'btn-primary'}`}
                                onClick={handleModalClose}
                            >
                                {modalContent.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Challenge3;