import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const EncryptionChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentStep, setCurrentStep] = useState(1);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const steps = [
        {
            id: 1,
            question: language === 'kurdish'
                ? "کام جۆری شێوەزارکردن بەهێزترە بۆ پاراستنی پەیوەندیەکانی تۆڕ؟"
                : "Which encryption type is stronger for protecting network connections?",
            options: [
                { id: 1, text: "WEP", correct: false },
                { id: 2, text: "WPA", correct: false },
                { id: 3, text: "WPA2", correct: true },
                { id: 4, text: "WPA3", correct: true }
            ],
            type: "single"
        },
        {
            id: 2,
            question: language === 'kurdish'
                ? "کام لەم ڕێسایانە پێویستە بەکاربهێنرێن بۆ پاراستنی باشی تۆڕی بێسیم؟"
                : "Which of these practices should be used to properly secure a wireless network?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "بەکارهێنانی وشەی نهێنی بەهێز"
                        : "Using a strong password",
                    correct: true
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "پەنابردن بە شێوەزارکردنی WPA3"
                        : "Using WPA3 encryption",
                    correct: true
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "وشەی نهێنی پێوانەیی وەک 'password123'"
                        : "Standard passwords like 'password123'",
                    correct: false
                },
                {
                    id: 4,
                    text: language === 'kurdish'
                        ? "شاردنەوەی ناوی تۆڕ (SSID)"
                        : "Hiding the network name (SSID)",
                    correct: true
                }
            ],
            type: "multiple"
        },
        {
            id: 3,
            question: language === 'kurdish'
                ? "ئەگەر پەیوەندییەکی VPN دروست بکەیت، چی ڕوودەدات؟"
                : "When you establish a VPN connection, what happens?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "هەموو پەیوەندیەکان شێوەزار دەکرێن"
                        : "All connections are encrypted",
                    correct: true
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "خێرایی ئینتەرنێت زیاد دەکات"
                        : "Internet speed increases",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "IP ناونیشانەکەت دەشاردرێتەوە"
                        : "Your IP address is hidden",
                    correct: true
                },
                {
                    id: 4,
                    text: language === 'kurdish'
                        ? "هیچ پاراستنێکی زیادە ناکرێت"
                        : "No additional protection is added",
                    correct: false
                }
            ],
            type: "multiple"
        }
    ];

    const handleAnswer = (stepId, answerId) => {
        if (steps.find(s => s.id === stepId).type === "single") {
            setUserAnswers({ ...userAnswers, [stepId]: [answerId] });
        } else {
            const currentAnswers = userAnswers[stepId] || [];
            if (currentAnswers.includes(answerId)) {
                setUserAnswers({ ...userAnswers, [stepId]: currentAnswers.filter(id => id !== answerId) });
            } else {
                setUserAnswers({ ...userAnswers, [stepId]: [...currentAnswers, answerId] });
            }
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateScore();
            setShowResult(true);
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;

        steps.forEach(step => {
            const correctOptions = step.options.filter(opt => opt.correct).map(opt => opt.id);
            const userSelection = userAnswers[step.id] || [];

            if (step.type === "single") {
                if (correctOptions.includes(userSelection[0])) {
                    correctAnswers++;
                }
            } else {
                const allCorrect = userSelection.length === correctOptions.length &&
                    userSelection.every(id => correctOptions.includes(id));
                if (allCorrect) correctAnswers++;
            }
        });

        const score = Math.floor((correctAnswers / steps.length) * 40);
        setTimeout(() => completeChallenge(score), 2000);
        return score;
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: شێوەزارکردنی تۆڕ' : 'Activity 2: Network Encryption'}</h3>

            {!showResult ? (
                <>
                    <div className="step-indicator">
                        {language === 'kurdish'
                            ? `پێشگەیشتن ${currentStep} لە ${steps.length}`
                            : `Step ${currentStep} of ${steps.length}`}
                    </div>

                    <div className="scenario-box">
                        <h4>{language === 'kurdish' ? 'پرسیار:' : 'Question:'}</h4>
                        <p>{steps[currentStep - 1].question}</p>
                    </div>

                    <div className="response-options">
                        {steps[currentStep - 1].options.map(option => (
                            <div
                                key={option.id}
                                className={`response-card ${(userAnswers[currentStep] || []).includes(option.id) ? 'selected' : ''}`}
                                onClick={() => handleAnswer(currentStep, option.id)}
                            >
                                <input
                                    type={steps[currentStep - 1].type === "single" ? "radio" : "checkbox"}
                                    checked={(userAnswers[currentStep] || []).includes(option.id)}
                                    readOnly
                                />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>

                    <button className="check-button" onClick={nextStep}>
                        {currentStep < steps.length
                            ? (language === 'kurdish' ? "دواتر" : "Next")
                            : (language === 'kurdish' ? "تەواوکردن" : "Finish")}
                    </button>
                </>
            ) : (
                <div className={`feedback ${calculateScore() >= 30 ? 'correct' : 'incorrect'}`}>
                    {calculateScore() >= 30 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ زانستێکی باشت هەیە لە شێوەزارکردنی تۆڕ.'
                                    : 'Great job! You have good knowledge of network encryption.'}
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
                                    ? 'هەندێک هەڵەت کردووە. شێوەزارکردن کلیلێکی گرنگە بۆ پاراستنی تۆڕ.'
                                    : 'You made some mistakes. Encryption is key to network security.'}
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

export default EncryptionChallenge;