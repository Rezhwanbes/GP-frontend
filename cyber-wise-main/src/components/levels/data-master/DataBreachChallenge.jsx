import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const DataBreachChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const scenarios = [
        {
            id: 1,
            text: language === 'kurdish'
                ? "کارمەندێک ئیمەیڵێکی فێڵکاری وەردەگرێت کە دەڵێت پێویستە زانیاری هەژماری بانکی نوێ بکاتەوە"
                : "An employee receives a fraudulent email asking to update bank account information",
            breach: true,
            explanation: language === 'kurdish'
                ? "ئەمە نمونەیەکی کلاسیکی فێڵکاری ئەلیکترۆنی (فیشینگ) کە دەبێتە هۆی شکاندنی زانیاری."
                : "This is a classic example of phishing that can lead to data breach."
        },
        {
            id: 2,
            text: language === 'kurdish'
                ? "کۆمپانیایەک پەڕەیەکی وێب دەکاتەوە بەبێ بەکارهێنانی پڕۆتۆکۆلی HTTPS"
                : "A company launches a webpage without using HTTPS protocol",
            breach: true,
            explanation: language === 'kurdish'
                ? "بەبێ HTTPS، زانیاری نێوان کڕیار و سێرڤەر پاراستراو نابێت و دەکرێت لەلایەن هێرشبەرەوە دەستکاری بکرێت."
                : "Without HTTPS, data between client and server isn't secure and can be intercepted."
        },
        {
            id: 3,
            text: language === 'kurdish'
                ? "سیستەمێک هەڵدەستێت بە نوێکردنەوەی خۆکارانەی نەرمەکاڵاکەی"
                : "A system performs automatic software updates",
            breach: false,
            explanation: language === 'kurdish'
                ? "نوێکردنەوەی خۆکارانەی نەرمەکاڵا شتێکی باشە چونکە چاکسازی ئاسایشی تێدایە."
                : "Automatic software updates are good as they include security patches."
        },
        {
            id: 4,
            text: language === 'kurdish'
                ? "کارمەندێک زانیاری کەسی خۆی لەسەر تۆڕی کۆمەڵایەتی بەربڵاو دەکات"
                : "An employee shares personal information on social media",
            breach: true,
            explanation: language === 'kurdish'
                ? "ئەمە دەکرێت ببێتە هۆی کۆکردنەوەی زانیاری بۆ هێرشی کۆمەڵایەتی (social engineering)."
                : "This can lead to information gathering for social engineering attacks."
        },
        {
            id: 5,
            text: language === 'kurdish'
                ? "کۆمپانیایەک پالیسی پاراستنی زانیاری جێبەجێ دەکات"
                : "A company implements a data protection policy",
            breach: false,
            explanation: language === 'kurdish'
                ? "پالیسی پاراستنی زانیاری شتێکی باشە و یارمەتی پاراستنی زانیاری کەسی دەدات."
                : "Data protection policies are good for safeguarding personal information."
        }
    ];

    const toggleSelection = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(opt => opt !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const checkAnswers = () => {
        setAttempts(attempts + 1);
        const allCorrect = scenarios.every(scenario =>
            (scenario.breach && selectedOptions.includes(scenario.id)) ||
            (!scenario.breach && !selectedOptions.includes(scenario.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            const score = 50 - (attempts * 5); // Deduct 5 points for each attempt
            setTimeout(() => completeChallenge(Math.max(score, 20)), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ١: ناسینەوەی شکاندنی زانیاری' : 'Activity 1: Identifying Data Breaches'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'کامیان لەم بارانە دەکرێت ببێتە هۆی شکاندنی زانیاری؟ (هەمووی دیاری بکە)'
                    : 'Which of these scenarios could lead to a data breach? (Select all)'}
            </p>

            <div className="scenarios-list">
                {scenarios.map(scenario => (
                    <div
                        key={scenario.id}
                        className={`scenario-item ${selectedOptions.includes(scenario.id) ? 'selected' : ''}`}
                        onClick={() => toggleSelection(scenario.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(scenario.id)}
                            readOnly
                        />
                        <label>{scenario.text}</label>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className={`feedback ${scenarios.every(scenario =>
                    (scenario.breach && selectedOptions.includes(scenario.id)) ||
                    (!scenario.breach && !selectedOptions.includes(scenario.id))) ? 'correct' : 'incorrect'}`}
                >
                    {scenarios.every(scenario =>
                        (scenario.breach && selectedOptions.includes(scenario.id)) ||
                        (!scenario.breach && !selectedOptions.includes(scenario.id))) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە سەرکەوتوویی هەڕەشەکانی شکاندنی زانیاریت ناسیەوە.'
                                    : 'Excellent! You successfully identified potential data breaches.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک هەڵەت کردووە. ئەم بارانە دەکرێت ببێتە هۆی شکاندنی زانیاری:'
                                    : 'You made some mistakes. These scenarios could lead to data breaches:'}
                            </p>
                            <ul>
                                {scenarios.filter(s => s.breach && !selectedOptions.includes(s.id)).map(s => (
                                    <li key={s.id}>{s.explanation}</li>
                                ))}
                                {scenarios.filter(s => !s.breach && selectedOptions.includes(s.id)).map(s => (
                                    <li key={s.id}>{s.explanation}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataBreachChallenge;