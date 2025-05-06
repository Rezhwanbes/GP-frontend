import React, { useState } from 'react';
import { useLanguage } from "../../../LanguageContext.jsx";

const FirewallChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedRules, setSelectedRules] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const firewallRules = [
        {
            id: 1,
            text: language === 'kurdish'
                ? "ڕێگەدان بە هەموو پەیوەندیەکانەوە"
                : "Allow all incoming connections",
            correct: false
        },
        {
            id: 2,
            text: language === 'kurdish'
                ? "بلۆک کردنی پەیوەندیە نەناسراوەکان"
                : "Block unknown connections",
            correct: true
        },
        {
            id: 3,
            text: language === 'kurdish'
                ? "بلۆک کردنی پۆرتی نەناسراوی TCP/UDP"
                : "Block unfamiliar TCP/UDP ports",
            correct: true
        },
        {
            id: 4,
            text: language === 'kurdish'
                ? "ڕێگەدان بە پەیوەندی SSH لە دەرەوە"
                : "Allow external SSH connections",
            correct: false
        },
        {
            id: 5,
            text: language === 'kurdish'
                ? "چاودێریکردنی پەیوەندیەکانی ناوخۆیی"
                : "Monitor internal network connections",
            correct: true
        },
        {
            id: 6,
            text: language === 'kurdish'
                ? "ڕێگەدان بە هەموو پەیوەندیەکانی HTTP/HTTPS"
                : "Allow all HTTP/HTTPS connections",
            correct: false
        }
    ];

    const toggleRule = (id) => {
        if (selectedRules.includes(id)) {
            setSelectedRules(selectedRules.filter(ruleId => ruleId !== id));
        } else {
            setSelectedRules([...selectedRules, id]);
        }
    };

    const checkConfiguration = () => {
        const allCorrect = firewallRules.every(rule =>
            (rule.correct && selectedRules.includes(rule.id)) ||
            (!rule.correct && !selectedRules.includes(rule.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            setTimeout(() => completeChallenge(30), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ١: ڕێکخستنی دیوارە ئاگرین' : 'Activity 1: Firewall Configuration'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? "کامیان لەم ڕێسایانە پارێزەرە و پێویستە دیاری بکرێن بۆ پاراستنی تۆڕەکەت؟ (هەمووی دیاری بکە)"
                    : "Which of these rules are protective and should be selected to secure your network? (Select all)"}
            </p>

            <div className="rules-list">
                {firewallRules.map(rule => (
                    <div
                        key={rule.id}
                        className={`rule-item ${selectedRules.includes(rule.id) ? 'selected' : ''}`}
                        onClick={() => toggleRule(rule.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedRules.includes(rule.id)}
                            readOnly
                        />
                        <label>{rule.text}</label>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkConfiguration}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className={`feedback ${firewallRules.every(rule =>
                    (rule.correct && selectedRules.includes(rule.id)) ||
                    (!rule.correct && !selectedRules.includes(rule.id))) ? 'correct' : 'incorrect'}`}
                >
                    {firewallRules.every(rule =>
                        (rule.correct && selectedRules.includes(rule.id)) ||
                        (!rule.correct && !selectedRules.includes(rule.id))) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! دیوارە ئاگرینەکەت بە باشی ڕێکخراوە بۆ پاراستنی تۆڕەکەت.'
                                    : 'Excellent! Your firewall is properly configured to protect your network.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک ڕێسای هەڵەت دیاریکردووە. دیوارە ئاگرین پێویستە تەنها پەیوەندیە پارێزراوەکان ڕێگەبدات.'
                                    : 'You selected some incorrect rules. A firewall should only allow protected connections.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FirewallChallenge;