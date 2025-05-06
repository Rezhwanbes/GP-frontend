import React, { useState } from "react";
import { useLanguage } from "../../../LanguageContext.jsx";

const AccessControlChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentStep, setCurrentStep] = useState(1);
    const [userChoices, setUserChoices] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const scenarios = [
        {
            id: 1,
            question: language === 'kurdish'
                ? "کەسێک لە بەشی HR داوای دەستگەیشتن بە زانیاری هەموو کارمەندەکان دەکات بۆ پڕۆژەیەکی ناوخۆیی. چی دەکەیت؟"
                : "Someone from HR requests access to all employee data for an internal project. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "هەموو زانیاریەکان دەدەمێ بەبێ هیچ پچڕانەوەیەک"
                        : "Give all information without any restrictions",
                    risk: "high"
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "تەنها زانیاری پێویست دەدەمێ کە پەیوەندی بە پڕۆژەکەوە هەیە"
                        : "Only provide necessary information related to the project",
                    risk: "none"
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "داوای ڕەزامەندی لە سەرپەرشتیار دەکەم پێش دابەشکردنی زانیاری"
                        : "Request supervisor approval before sharing information",
                    risk: "low"
                }
            ]
        },
        {
            id: 2,
            question: language === 'kurdish'
                ? "بەڕێوەبەری بەشی فرۆشتن داوای دەستگەیشتن بە زانیاری کڕیارەکان دەکات. چی دەکەیت؟"
                : "The sales manager requests access to customer data. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "تەنها زانیاری کڕیارەکانی بەشی خۆی دەدەمێ"
                        : "Only provide data for customers in their department",
                    risk: "none"
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "هەموو زانیاریەکان دەدەمێ بەبێ هیچ سنوردارکردنێک"
                        : "Give all information without any restrictions",
                    risk: "high"
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "داوای ڕەزامەندی لە کڕیارەکان دەکەم پێش دابەشکردن"
                        : "Request customer consent before sharing",
                    risk: "low"
                }
            ]
        },
        {
            id: 3,
            question: language === 'kurdish'
                ? "کەسێک دەڵێت پەیوەندی بە پشتگیری تەکنیکی هەیە و داوای دەستگەیشتن بە سیستەمەکەت دەکات. چی دەکەیت؟"
                : "Someone claims to be from tech support and requests access to your system. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "هیچ زانیاریەک نادەمێ پێش پشتڕاستکردنەوەی ناسنامەکەی"
                        : "Don't provide any information before verifying their identity",
                    risk: "none"
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "دەستگەیشتنی تەمەنی ١٠ خولەک دەدەمێ بۆ ئەوەی کێشەکە چارەسەر بکات"
                        : "Give 10-minute limited access to fix the issue",
                    risk: "medium"
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "زانیاری تەواو دەدەمێ چونکە پشتگیری تەکنیکییە"
                        : "Give full access because it's tech support",
                    risk: "high"
                }
            ]
        }
    ];

    const handleOptionSelect = (option) => {
        setUserChoices([...userChoices, option]);

        if (currentStep < scenarios.length) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResult(true);
            const score = calculateScore();
            setTimeout(() => completeChallenge(score), 3000);
        }
    };

    const calculateScore = () => {
        const riskPoints = userChoices.reduce((points, choice) => {
            if (choice.risk === "high") return points + 0;
            if (choice.risk === "medium") return points + 10;
            if (choice.risk === "low") return points + 15;
            return points + 20; // none
        }, 0);

        return Math.min(30, riskPoints); // Max 30 points for this challenge
    };

    return (
        <div className="challenge-card">
            <h3>
                {language === 'kurdish'
                    ? 'چالاکی ٢: کۆنترۆلی دەستگەیشتن'
                    : 'Activity 2: Access Control'}
            </h3>

            {!showResult ? (
                <>
                    <div className="step-indicator">
                        {language === 'kurdish'
                            ? `پێشگەیشتن ${currentStep} لە ${scenarios.length}`
                            : `Step ${currentStep} of ${scenarios.length}`}
                    </div>

                    <div className="scenario-box">
                        <h4>{language === 'kurdish' ? 'دەقەکە:' : 'Scenario:'}</h4>
                        <p>{scenarios[currentStep - 1].question}</p>
                    </div>

                    <div className="response-options">
                        {scenarios[currentStep - 1].options.map(option => (
                            <div
                                key={option.id}
                                className="response-card"
                                onClick={() => handleOptionSelect(option)}
                            >
                                <input type="radio" name={`scenario-${currentStep}`} />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={`feedback ${calculateScore() >= 20 ? 'correct' : 'partial'}`}>
                    {calculateScore() >= 20 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە سەرکەوتوویی ڕێگای دروستت بەکارهێنا بۆ کۆنترۆلی دەستگەیشتن.'
                                    : 'Excellent! You successfully applied proper access control measures.'}
                            </p>
                            <p>
                                {language === 'kurdish'
                                    ? 'کۆی خاڵەکان: '
                                    : 'Total score: '}{calculateScore()}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک هەڵەت کردووە. لەبیرت بێت کە دەستگەیشتن پێویستە بە پێی پێویستی کارمەندان بکرێت.'
                                    : 'You made some mistakes. Remember that access should be granted based on employee needs.'}
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

export default AccessControlChallenge;