import React, {useState} from "react";
import {useLanguage} from "../../../LanguageContext.jsx";
const ResponseChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const responses = [
        {
            id: 1,
            text: language === 'kurdish'
                ? 'کلیک لەسەر لینکەکە دەکەم و زانیاریەکەم دەنووسم'
                : 'I click the link and enter my information',
            correct: false
        },
        {
            id: 2,
            text: language === 'kurdish'
                ? 'ئیمەیڵەکە ڕاپۆرت دەکەم و دەیسڕمەوە'
                : 'I report the email and delete it',
            correct: true
        },
        {
            id: 3,
            text: language === 'kurdish'
                ? 'بە ڕاستەوخۆ پەیوەندی بە پشتگیری فەیسبووکەوە دەکەم'
                : 'I contact Facebook support directly',
            correct: true
        },
        {
            id: 4,
            text: language === 'kurdish'
                ? 'ئیمەیڵەکە بەجێدەهێڵم و هیچ کارێک ناکەم'
                : 'I leave the email and do nothing',
            correct: false
        }
    ];

    const checkResponse = (responseId) => {
        const response = responses.find(r => r.id === responseId);
        setIsCorrect(response.correct);
        setSelectedResponse(responseId);
        setShowFeedback(true);

        if (response.correct) {
            setTimeout(() => completeChallenge(35), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: وەڵامدانەوەی ڕاست' : 'Activity 3: Correct Response'}</h3>
            <p className="scenario">
                {language === 'kurdish'
                    ? 'ئیمەیڵێکت لێنراوە کە دەڵێت هەژمارەکەت لە مەترسیدایە و دەبێت خێرا کلیک لەسەر لینکێک بکەیت و زانیاریەکەت بنووسیت. کام لەم وەڵامانە ڕاستە؟'
                    : 'You received an email saying your account is at risk and you need to quickly click a link and enter your information. Which of these responses is correct?'}
            </p>

            <div className="response-options">
                {responses.map(response => (
                    <div
                        key={response.id}
                        className={`response-card ${selectedResponse === response.id ? 'selected' : ''}`}
                        onClick={() => !showFeedback && checkResponse(response.id)}
                    >
                        <input
                            type="radio"
                            checked={selectedResponse === response.id}
                            readOnly
                        />
                        <label>{response.text}</label>
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
                                    ? 'ئەمە وەڵامێکی سەلامەت و زیرەکانە!'
                                    : 'This is a safe and smart response!'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'ئەم وەڵامە مەترسی هەیە. هەوڵ بدە وەڵامێکی سەلامەتتر دیاری بکەیت.'
                                    : 'This response is risky. Try to choose a safer option.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResponseChallenge;