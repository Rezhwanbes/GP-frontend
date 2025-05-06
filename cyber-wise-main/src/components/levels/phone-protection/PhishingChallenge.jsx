import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const PhishingChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentEmail, setCurrentEmail] = useState(0);
    const [userChoices, setUserChoices] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const emails = [
        {
            id: 1,
            subject: language === 'kurdish' ? "پێویستە وشەی نهێنی هەژمارەکەت نوێ بکەیتەوە" : "You need to reset your account password",
            sender: language === 'kurdish'
                ? "پاسۆرد سێرڤیس <no-reply@password-service.com>"
                : "Password Service <no-reply@password-service.com>",
            content: language === 'kurdish'
                ? "پێویستە وشەی نهێنی هەژمارەکەت نوێ بکەیتەوە بۆ پاراستنی هەژمارەکەت. تکایە کلیک لەسەر لینکەکەی خوارەوە بکە بۆ نوێکردنەوەی وشەی نهێنیەکەت."
                : "You need to reset your account password to protect your account. Please click on the link below to reset your password.",
            isPhishing: true,
            clues: language === 'kurdish'
                ? [
                    "ناونیشانی ئیمەیڵەکە نەناسراوە",
                    "داواکردنی کلیککردن لەسەر لینک",
                    "فۆرماتی نادروستی ئیمەیڵ"
                ]
                : [
                    "Unrecognized email address",
                    "Request to click on a link",
                    "Incorrect email format"
                ]
        },
        {
            id: 2,
            subject: language === 'kurdish' ? "داواکاری ڕەسمی بۆ نوێکردنەوەی ئەپەکەت" : "Official request to update your app",
            sender: language === 'kurdish'
                ? "گووگڵ پڵەی ستۆر <play-store@google.com>"
                : "Google Play Store <play-store@google.com>",
            content: language === 'kurdish'
                ? "ئەپەکەت پێویستی بە نوێکردنەوەیەک هەیە بۆ ئەوەی بەردەوام بیت لە بەکارهێنانی. تکایە بچۆرە ناو پڵەی ستۆرەوە و نوێکردنەوەکە دابمەزرێنە."
                : "Your app needs an update to continue functioning. Please go to the Play Store and install the update.",
            isPhishing: false,
            clues: language === 'kurdish'
                ? [
                    "ناونیشانی ئیمەیڵەکە فەرمیە",
                    "داوا ناکات کلیک لەسەر لینک بکەیت",
                    "فۆرماتی پێشکەشکردنی ڕەسمی"
                ]
                : [
                    "Official email address",
                    "Doesn't ask to click on a link",
                    "Official presentation format"
                ]
        },
        {
            id: 3,
            subject: language === 'kurdish' ? "براوەی دیاری ١٠٠٠$ بوویت!" : "You won a $1000 prize!",
            sender: language === 'kurdish'
                ? "خێزانەکەم <winner@prize-giveaway.com>"
                : "Family <winner@prize-giveaway.com>",
            content: language === 'kurdish'
                ? "پیرۆزە! تۆ براوەی دیاری ١٠٠٠$ بوویت لە یارییەکەمان! بۆ وەرگرتنی پارەکە، تکایە زانیاری کارتی بانکیەکەت بنێرە بۆ ئەوەی پارەکە بگوازینەوە بۆ هەژمارەکەت."
                : "Congratulations! You won a $1000 prize in our game! To receive the money, please send your credit card information so we can transfer the money to your account.",
            isPhishing: true,
            clues: language === 'kurdish'
                ? [
                    "ناونیشانی نامە نەناسراوە",
                    "داواکردنی زانیاری کارتی بانکی",
                    "بەڵێنی دیاری بێبەرامبەر"
                ]
                : [
                    "Unrecognized sender",
                    "Request for credit card information",
                    "Promise of free prize"
                ]
        }
    ];

    const handleUserChoice = (isPhishing) => {
        setUserChoices([...userChoices, {
            emailId: emails[currentEmail].id,
            userAnswer: isPhishing,
            correct: isPhishing === emails[currentEmail].isPhishing
        }]);

        if (currentEmail < emails.length - 1) {
            setCurrentEmail(currentEmail + 1);
        } else {
            setShowResult(true);
            const score = calculateScore();
            setTimeout(() => completeChallenge(score), 3000);
        }
    };

    const calculateScore = () => {
        const correctCount = userChoices.filter(choice => choice.correct).length;
        return Math.floor((correctCount / emails.length) * 40);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: ناسینەوەی فێڵی سەمەرە لە ئیمەیڵ و پەیام' : 'Activity 2: Identifying Phishing in Emails and Messages'}</h3>

            {!showResult ? (
                <>
                    <div className="email-preview">
                        <div className="email-header">
                            <h4>{emails[currentEmail].subject}</h4>
                            <p className="sender">
                                {language === 'kurdish' ? 'لە: ' : 'From: '}{emails[currentEmail].sender}
                            </p>
                        </div>
                        <div className="email-content">
                            <p>{emails[currentEmail].content}</p>
                        </div>
                    </div>

                    <div className="phishing-options">
                        <button className="btn-danger" onClick={() => handleUserChoice(true)}>
                            {language === 'kurdish' ? 'فێڵی سەمەرەیە' : 'This is phishing'}
                        </button>
                        <button className="btn-safe" onClick={() => handleUserChoice(false)}>
                            {language === 'kurdish' ? 'پەیامێکی سەلامەتە' : 'Safe message'}
                        </button>
                    </div>

                    <div className="clues-section">
                        <h5>{language === 'kurdish' ? 'نیشانەکانی فێڵی سەمەرە:' : 'Signs of phishing:'}</h5>
                        <ul>
                            {emails[currentEmail].clues.map((clue, index) => (
                                <li key={index}>{clue}</li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <div className={`feedback ${calculateScore() >= 30 ? 'correct' : 'incorrect'}`}>
                    {calculateScore() >= 30 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە سەرکەوتوویی فێڵەکانی سەمەرەت ناسیەوە.'
                                    : 'Great job! You successfully identified the phishing attempts.'}
                            </p>
                            <p>
                                {language === 'kurdish'
                                    ? 'کۆی خاڵەکان: '
                                    : 'Total score: '}{calculateScore()}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک هەڵەت کردووە. لەبیرت بێت کە هەرگیز زانیاری کەسی نادەیت لە ڕێگەی ئیمەیڵەوە.'
                                    : 'You made some mistakes. Remember to never give personal information via email.'}
                            </p>
                            <p>
                                {language === 'kurdish'
                                    ? 'کۆی خاڵەکان: '
                                    : 'Total score: '}{calculateScore()}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PhishingChallenge;