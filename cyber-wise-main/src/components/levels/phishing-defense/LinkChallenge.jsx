import React, {useState} from "react";
import {useLanguage} from "../../../LanguageContext.jsx";
const LinkChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [userAnswer, setUserAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const links = [
        { url: "https://www.facebook.com/login", safe: true },
        { url: "https://facebook.secure-login.net", safe: false },
        { url: "https://support.facebook.com", safe: true },
        { url: "http://fb-security-update.com", safe: false }
    ];

    const checkAnswer = (url, isSafe) => {
        const correct = links.find(link => link.url === url)?.safe === isSafe;
        setIsCorrect(correct);
        setUserAnswer(url);
        setShowFeedback(true);

        if (correct) {
            setTimeout(() => completeChallenge(35), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: ناسینەوەی لینکی ساختە' : 'Activity 2: Identify Fake Links'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'لە خوارەوە چەند لینکێکت پێدەدەین. دیاری بکە کامیان سەلامەت و کامیان ساختەن:'
                    : 'Below are several links. Determine which are safe and which are fake:'}
            </p>

            <div className="link-analysis-container">
                {links.map((link, index) => (
                    <div key={index} className="link-item">
                        <div className="link-url">{link.url}</div>
                        <div className="link-actions">
                            <button
                                className={`safety-btn ${userAnswer === link.url && isCorrect && !link.safe ? 'selected' : ''}`}
                                onClick={() => checkAnswer(link.url, false)}
                                disabled={showFeedback}
                            >
                                {language === 'kurdish' ? 'ساختە' : 'Fake'}
                            </button>
                            <button
                                className={`safety-btn ${userAnswer === link.url && isCorrect && link.safe ? 'selected' : ''}`}
                                onClick={() => checkAnswer(link.url, true)}
                                disabled={showFeedback}
                            >
                                {language === 'kurdish' ? 'سەلامەت' : 'Safe'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showFeedback && (
                <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە دروستی لینکی ساختەت ناسیەوە.'
                                    : 'Very good! You correctly identified the fake link.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەڵەت کردووە. سەرنج بدە بە ناونیشانی دۆمەین و پڕۆتۆکۆڵەکە.'
                                    : 'You made a mistake. Pay attention to the domain name and protocol.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default LinkChallenge;