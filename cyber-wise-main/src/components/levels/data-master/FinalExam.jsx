import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const FinalExam = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: language === 'kurdish'
                ? "کام لەم ڕێگایانە باشترینە بۆ پاراستنی زانیاری کەسی لە کاتی بەکارهێنانی وای-فای گشتی؟"
                : "Which of these is the best way to protect personal information when using public WiFi?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish' ? "بەکارهێنانی VPN" : "Using a VPN"
                },
                {
                    id: 2,
                    text: language === 'kurdish' ? "بەکارهێنانی HTTPS لە هەموو ماڵپەڕەکان" : "Using HTTPS on all websites"
                },
                {
                    id: 3,
                    text: language === 'kurdish' ? "هیچ کردارێکی حیساب و تایبەت نەکەیت" : "Avoiding any private activities"
                },
                {
                    id: 4,
                    text: language === 'kurdish' ? "هەموویان" : "All of the above"
                }
            ],
            correct: 4,
            explanation: language === 'kurdish'
                ? "لە کاتی بەکارهێنانی وای-فای گشتی، باشترین ڕێگا بریتییە لە بەکارهێنانی VPN و HTTPS و خۆپاراستن لە کردارە حیسابەکان."
                : "When using public WiFi, the best approach is using VPN, HTTPS, and avoiding sensitive activities."
        },
        {
            id: 2,
            question: language === 'kurdish'
                ? "ئەگەر گومانت هەیە کە هەژمارەکەت لەلایەن کەسێکی ترەوە بەکارهێنراوە، چی دەکەیت؟"
                : "If you suspect your account has been compromised, what should you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish' ? "وشەی نهێنیەکە دەگۆڕم" : "Change the password"
                },
                {
                    id: 2,
                    text: language === 'kurdish' ? "پەیوەندی بە خزمەتگوزاریەکە دەکەم و ڕاپۆرت دەدەم" : "Contact the service and report it"
                },
                {
                    id: 3,
                    text: language === 'kurdish' ? "هەموو هەژمارەکانم دەگۆڕم کە هەمان وشەی نهێنییان هەیە" : "Change all accounts with the same password"
                },
                {
                    id: 4,
                    text: language === 'kurdish' ? "هەموویان" : "All of the above"
                }
            ],
            correct: 4,
            explanation: language === 'kurdish'
                ? "پێویستە هەموو ئەم کردارانە ئەنجام بدەیت بۆ پاراستنی هەژمارەکەت."
                : "You should perform all these actions to secure your account."
        },
        {
            id: 3,
            question: language === 'kurdish'
                ? "کام لەمە باشترین ڕێگایە بۆ پاراستنی زانیاری لە کۆمپانیایەک؟"
                : "Which of these is the best approach for data protection in a company?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish' ? "پەروەردەکردنی کارمەندان لەسەر ئاسایشی زانیاری" : "Employee training on information security"
                },
                {
                    id: 2,
                    text: language === 'kurdish' ? "بەکارهێنانی نەرمەکاڵای پاراستن" : "Using protection software"
                },
                {
                    id: 3,
                    text: language === 'kurdish' ? "پالیسی بەهێزی پاراستنی زانیاری" : "Strong data protection policies"
                },
                {
                    id: 4,
                    text: language === 'kurdish' ? "هەموویان" : "All of the above"
                }
            ],
            correct: 4,
            explanation: language === 'kurdish'
                ? "پاراستنی زانیاری پێویستی بە هەموو ئەم ڕێگایانە هەیە بۆ کاریگەری."
                : "Data protection requires all these approaches for effectiveness."
        }
    ];

    const handleAnswer = (questionId, optionId) => {
        setAnswers({
            ...answers,
            [questionId]: optionId
        });
    };

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.correct) {
                correct++;
            }
        });
        const calculatedScore = Math.floor((correct / questions.length) * 50);
        setScore(calculatedScore);
        setSubmitted(true);
        completeChallenge(calculatedScore);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'تاقیکردنەوەی کۆتایی' : 'Final Exam'}</h3>
            <p className="instructions">
                {language === 'kurdish' ? 'وەڵامی هەموو پرسیارەکان بدەوە' : 'Answer all the questions'}
            </p>

            {!submitted ? (
                <>
                    {questions.map(q => (
                        <div key={q.id} className="question-box">
                            <h4>{q.question}</h4>
                            <div className="options-list">
                                {q.options.map(opt => (
                                    <div
                                        key={opt.id}
                                        className={`option-item ${answers[q.id] === opt.id ? 'selected' : ''}`}
                                        onClick={() => handleAnswer(q.id, opt.id)}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${q.id}`}
                                            checked={answers[q.id] === opt.id}
                                            readOnly
                                        />
                                        <label>{opt.text}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        className="check-button"
                        onClick={calculateScore}
                        disabled={Object.keys(answers).length < questions.length}
                    >
                        {language === 'kurdish' ? 'کۆتایی هێنان' : 'Submit'}
                    </button>
                </>
            ) : (
                <div className="feedback">
                    <h4>{language === 'kurdish' ? 'ئەنجامەکان:' : 'Results:'}</h4>
                    <div className="score-display">
                        {language === 'kurdish' ? `خاڵەکان: ${score} لە ٥٠` : `Score: ${score} out of 50`}
                    </div>

                    {questions.map(q => (
                        <div key={q.id} className="question-result">
                            <p>{q.question}</p>
                            <p className={answers[q.id] === q.correct ? 'correct-answer' : 'wrong-answer'}>
                                {language === 'kurdish' ? 'وەڵامی تۆ: ' : 'Your answer: '}
                                {q.options.find(o => o.id === answers[q.id])?.text}
                                {answers[q.id] !== q.correct && (
                                    <span>
                                        {language === 'kurdish'
                                            ? ` (وەڵامی ڕاست: ${q.options.find(o => o.id === q.correct)?.text})`
                                            : ` (Correct answer: ${q.options.find(o => o.id === q.correct)?.text})`}
                                    </span>
                                )}
                            </p>
                            <p className="explanation">{q.explanation}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FinalExam;