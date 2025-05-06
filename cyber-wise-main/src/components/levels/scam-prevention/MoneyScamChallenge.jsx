import React, {useState} from "react";
import {useLanguage} from "../../../LanguageContext.jsx";
const MoneyScamChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();

    const [currentStep, setCurrentStep] = useState(1);
    const [userChoices, setUserChoices] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const steps = [
        {
            id: 1,
            question: language === 'kurdish'
                ? "پەیامێکت پێگەیشت کە دەڵێت براوەی یاریەکی ئینتەرنێتی بوویت و ٥٠٠$ بردنەوەتەوە. چی دەکەیت؟"
                : "You received a message saying you won an internet game and won $500. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "کلیک لەسەر لینکەکە دەکەم بۆ وەرگرتنی پارەکە"
                        : "Click the link to receive the money",
                    risk: "high"
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "پەیامەکە دەسڕمەوە"
                        : "Delete the message",
                    risk: "none"
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "پەیوەندی بە پۆلیس ئینتەرنێتی دەکەم و ڕاپۆرت دەکەم"
                        : "Contact cyber police and report it",
                    risk: "none"
                }
            ]
        },
        {
            id: 2,
            question: language === 'kurdish'
                ? "کەسێک پەیوەندیت پێکرد و دەیەوێت پارەیەکت پێبدەیت بۆ ئەوەی دوو ئەوەندەی بۆ بگەڕێنێتەوە. چی دەکەیت؟"
                : "Someone called you wanting you to give them money to double it for you. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "پارەکەم دەدەمێ چونکە دەرفەتێکی زێرینە"
                        : "I give the money because it's a golden opportunity",
                    risk: "high"
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "پەیوەندیەکە دەوەستێنم"
                        : "I hang up the call",
                    risk: "none"
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "بە هاوڕێیەکم دەڵێم بۆ ئەوەی ئاگاداربکاتەوە"
                        : "I tell a friend to warn them",
                    risk: "none"
                }
            ]
        },
        {
            id: 3,
            question: language === 'kurdish'
                ? "ئیمەیڵێکت پێگەیشت کە دەڵێت پێویستە پارە بۆت بگوازیتەوە بۆ ئەوەی بتوانیت کاڵایەک وەربگریت. چی دەکەیت؟"
                : "You received an email saying you need to transfer money to receive a product. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "پارەکە دەگوازمەوە بۆ ناونیشانەکە"
                        : "I transfer the money to the address",
                    risk: "high"
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "ئیمەیڵەکە ڕاپۆرت دەکەم"
                        : "I report the email",
                    risk: "none"
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "پەیوەندی بە فرۆشگاکە دەکەم بە ژمارەی فەرمی"
                        : "I contact the store using their official number",
                    risk: "none"
                }
            ]
        }
    ];

    const handleOptionSelect = (option) => {
        setUserChoices([...userChoices, option]);

        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        } else {
            const score = calculateScore();
            setShowResult(true);
            setTimeout(() => completeChallenge(score), 3000);
        }
    };

    const calculateScore = () => {
        const riskCount = userChoices.reduce((count, choice) => {
            if (choice.risk === "high") return count + 1;
            return count;
        }, 0);

        if (riskCount === 0) return 40;
        if (riskCount === 1) return 30;
        if (riskCount === 2) return 20;
        return 10;
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: فێڵی دراو' : 'Activity 3: Money Scams'}</h3>

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
                                className="response-card"
                                onClick={() => handleOptionSelect(option)}
                            >
                                <input type="radio" name={`step-${currentStep}`} />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={`feedback ${calculateScore() >= 30 ? 'correct' : 'incorrect'}`}>
                    {calculateScore() >= 30 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە سەرکەوتوویی خۆت پاراست لە فێڵەکانی سەمەرەی دراو.'
                                    : 'Very good! You successfully protected yourself from money scams.'}
                            </p>
                            <p>
                                {language === 'kurdish'
                                    ? `کۆی خاڵەکان: ${calculateScore()}`
                                    : `Total score: ${calculateScore()}`}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک هەڵەت کردووە. لەبیرت بێت کە هیچ کەسێک پارەی بێبەرامبەر نادات.'
                                    : 'You made some mistakes. Remember that no one gives free money.'}
                            </p>
                            <p>
                                {language === 'kurdish'
                                    ? `کۆی خاڵەکان: ${calculateScore()}`
                                    : `Total score: ${calculateScore()}`}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MoneyScamChallenge;