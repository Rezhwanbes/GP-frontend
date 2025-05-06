import React, {useState} from "react";
import {useLanguage} from "../../../LanguageContext.jsx";
const PhoneScamChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();

    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const scenario = {
        title: language === 'kurdish' ? "پەیوەندی تەلەفۆنی" : "Phone Call",
        description: language === 'kurdish'
            ? "پەیوەندییەکت پێگەیشت لە کەسێک کە دەڵێت لە بەشی فەرمی بانکەوەیە و پێویستە زانیاری کارتی بانکیەکەت پشتڕاست بکەیتەوە بۆ پاراستنی هەژمارەکەت."
            : "You received a call from someone claiming to be from your bank's official department, asking you to verify your card information to protect your account.",
        responses: [
            {
                id: 1,
                text: language === 'kurdish'
                    ? "زانیاری کارتەکەم دەدەمێ بەڵێنی پاراستنی"
                    : "I give my card information with the promise of protection",
                correct: false
            },
            {
                id: 2,
                text: language === 'kurdish'
                    ? "پەیوەندیم پێوە دەکەم بە بانکەکە بە ژمارەی فەرمی"
                    : "I call the bank using their official number",
                correct: true
            },
            {
                id: 3,
                text: language === 'kurdish'
                    ? "هیچ زانیاریەک نادەم و پەیوەندیەکە دەوەستێنم"
                    : "I don't provide any information and hang up",
                correct: true
            },
            {
                id: 4,
                text: language === 'kurdish'
                    ? "ژمارەی کارت و کوودەکەم دەدەمێ بۆ ئەوەی پشکنین بکەن"
                    : "I give my card number and code for verification",
                correct: false
            }
        ]
    };

    const checkResponse = (responseId) => {
        const isCorrect = scenario.responses.find(r => r.id === responseId)?.correct;
        setSelectedResponse(responseId);
        setShowFeedback(true);

        if (isCorrect) {
            setTimeout(() => completeChallenge(30), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ١: فێڵی پەیوەندی تەلەفۆنی' : 'Activity 1: Phone Call Scams'}</h3>
            <div className="scenario-box">
                <h4>{language === 'kurdish' ? 'دەقەکە:' : 'Scenario:'}</h4>
                <p>{scenario.description}</p>
            </div>

            <div className="response-options">
                {scenario.responses.map(response => (
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
                <div className={`feedback ${scenario.responses.find(r => r.id === selectedResponse)?.correct ? 'correct' : 'incorrect'}`}>
                    {scenario.responses.find(r => r.id === selectedResponse)?.correct ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'وەڵامێکی سەلامەت و زیرەکانە! هیچ کاتێک زانیاری کەسی نادەیت لە ڕێگەی تەلەفۆنەوە.'
                                    : 'Safe and smart response! Never give personal information over the phone.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'ئەم وەڵامە مەترسی هەیە! بانکەکان هەرگیز زانیاری کارت لە ڕێگەی تەلەفۆن داوا ناکەن.'
                                    : 'This response is risky! Banks never ask for card information over the phone.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PhoneScamChallenge;