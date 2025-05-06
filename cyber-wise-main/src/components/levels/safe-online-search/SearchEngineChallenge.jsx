import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const SearchEngineChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: language === 'kurdish'
                ? "کام لەم گەڕانانە سەلامەتترینە بۆ گەڕان لەسەر نەخۆشییەک؟"
                : "Which of these searches is safest for researching an illness?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "نەخۆشی + site:.gov"
                        : "illness + site:.gov",
                    correct: true
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "نەخۆشی + treatment + free"
                        : "illness + treatment + free",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "نەخۆشی + best cure"
                        : "illness + best cure",
                    correct: false
                },
                {
                    id: 4,
                    text: language === 'kurdish'
                        ? "نەخۆشی + fastest solution"
                        : "illness + fastest solution",
                    correct: false
                }
            ]
        },
        {
            id: 2,
            question: language === 'kurdish'
                ? "کام لەم گەڕانانە باشترینە بۆ دۆزینەوەی زانیاری فەرمی لەسەر یاسایەک؟"
                : "Which search is best for finding official information about a law?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "یاسا + PDF"
                        : "law + PDF",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "یاسا + filetype:pdf site:.gov"
                        : "law + filetype:pdf site:.gov",
                    correct: true
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "یاسا + download"
                        : "law + download",
                    correct: false
                },
                {
                    id: 4,
                    text: language === 'kurdish'
                        ? "یاسا + latest version"
                        : "law + latest version",
                    correct: false
                }
            ]
        },
        {
            id: 3,
            question: language === 'kurdish'
                ? "کام لەم گەڕانانە باشترینە بۆ دۆزینەوەی کتێبێکی دروست؟"
                : "Which search is best for finding a legitimate book?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "کتێب + free download"
                        : "book + free download",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "کتێب + buy"
                        : "book + buy",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "کتێب + site:.edu OR site:.org"
                        : "book + site:.edu OR site:.org",
                    correct: true
                },
                {
                    id: 4,
                    text: language === 'kurdish'
                        ? "کتێب + latest edition"
                        : "book + latest edition",
                    correct: false
                }
            ]
        }
    ];

    const searchEngines = [
        {
            id: 1,
            name: "DuckDuckGo",
            privacy: "high",
            description: language === 'kurdish'
                ? "گوازینەوەی نەناسراو و پاراستنی زانیاری"
                : "Anonymous browsing and data protection"
        },
        {
            id: 2,
            name: "Startpage",
            privacy: "high",
            description: language === 'kurdish'
                ? "ئەنجامەکانی گووگل بەبێ پاراستنی نهێنی"
                : "Google results without privacy compromise"
        },
        {
            id: 3,
            name: "Google",
            privacy: "low",
            description: language === 'kurdish'
                ? "گوازینەوەی ناسراو و کۆکردنەوەی زانیاری"
                : "Known browsing and data collection"
        },
        {
            id: 4,
            name: "Bing",
            privacy: "medium",
            description: language === 'kurdish'
                ? "هەندێک پاراستنی نهێنی بەڵام کۆکردنەوەی زانیاری"
                : "Some privacy protection but still collects data"
        },
        {
            id: 5,
            name: "Qwant",
            privacy: "high",
            description: language === 'kurdish'
                ? "مووتۆری گەڕانی فەڕەنسی بە پاراستنی نهێنی"
                : "French search engine with privacy protection"
        }
    ];

    const handleAnswer = (questionId, optionId) => {
        setAnswers({
            ...answers,
            [questionId]: optionId
        });

        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateScore();
            setShowResults(true);
        }
    };

    const calculateScore = () => {
        let correctCount = 0;
        questions.forEach(q => {
            const selectedOption = q.options.find(o => o.id === answers[q.id]);
            if (selectedOption && selectedOption.correct) {
                correctCount++;
            }
        });

        const calculatedScore = Math.floor((correctCount / questions.length) * 35);
        setScore(calculatedScore);
        completeChallenge(calculatedScore);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: مووتۆری گەڕانی سەلامەت' : 'Activity 2: Safe Search Engines'}</h3>

            {!showResults ? (
                <>
                    <div className="step-indicator">
                        {language === 'kurdish'
                            ? `پرسیار ${currentQuestion} لە ${questions.length}`
                            : `Question ${currentQuestion} of ${questions.length}`}
                    </div>

                    <div className="question-box">
                        <h4>{language === 'kurdish' ? 'پرسیار:' : 'Question:'}</h4>
                        <p>{questions[currentQuestion - 1].question}</p>
                    </div>

                    <div className="options-grid">
                        {questions[currentQuestion - 1].options.map(option => (
                            <div
                                key={option.id}
                                className={`option-card ${answers[questions[currentQuestion - 1].id] === option.id ? 'selected' : ''}`}
                                onClick={() => handleAnswer(questions[currentQuestion - 1].id, option.id)}
                            >
                                <div className="option-text">{option.text}</div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className={`feedback ${score >= 25 ? 'correct' : 'incorrect'}`}>
                        {score >= 25 ? (
                            <>
                                <i className="fas fa-check-circle"></i>
                                <p>
                                    {language === 'kurdish'
                                        ? 'زۆر باش! تۆ فێری گەڕانی زیرەکانە بە سەلامەتی بویت.'
                                        : 'Great job! You learned how to search safely and smartly.'}
                                </p>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-times-circle"></i>
                                <p>
                                    {language === 'kurdish'
                                        ? 'هەندێک هەڵەت کردووە. لەبیرت بێت گەڕان لەسەر سایتی فەرمی باشترین ڕێگایە.'
                                        : 'You made some mistakes. Remember searching on official sites is the best approach.'}
                                </p>
                            </>
                        )}
                        <p>
                            {language === 'kurdish'
                                ? 'کۆی خاڵەکان: '
                                : 'Total score: '}{score}
                        </p>
                    </div>

                    <div className="search-engine-comparison">
                        <h4>{language === 'kurdish'
                            ? 'پێڕستی مووتۆری گەڕانی سەلامەت:'
                            : 'List of Safe Search Engines:'}</h4>
                        <div className="engine-table">
                            {searchEngines.map(engine => (
                                <div key={engine.id} className={`engine-row ${engine.privacy}`}>
                                    <div className="engine-name">{engine.name}</div>
                                    <div className="engine-desc">{engine.description}</div>
                                    <div className="engine-privacy">
                                        {language === 'kurdish'
                                            ? (engine.privacy === "high" ? "پاراستنی زۆر" :
                                                engine.privacy === "medium" ? "پاراستنی مامناوەند" : "پاراستنی کەم")
                                            : (engine.privacy === "high" ? "High privacy" :
                                                engine.privacy === "medium" ? "Medium privacy" : "Low privacy")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchEngineChallenge;