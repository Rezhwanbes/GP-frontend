import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const EncryptionChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            id: 1,
            question: language === 'kurdish'
                ? "کام لەم ڕێگایانە پاراستنی زانیاری باشترە بۆ ناردنی زانیاری حیسابی بانکی؟"
                : "Which of these methods provides better protection for sending banking information?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish' ? "ئیمەیڵی ئاسایی" : "Regular email",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish' ? "پەیامی تەلەفۆنی ئاسایی" : "Regular text message",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish' ? "پەڕەی وێب بە HTTPS" : "Website with HTTPS",
                    correct: true
                },
                {
                    id: 4,
                    text: language === 'kurdish' ? "پەیامی کەناڵێکی کۆمەڵایەتی" : "Social media message",
                    correct: false
                }
            ],
            explanation: language === 'kurdish'
                ? "HTTPS پاراستنی زانیاری دڵنیاکراوە دابین دەکات لە کاتی ناردن بەناو تۆڕی ئینتەرنێت."
                : "HTTPS provides secure encrypted communication over the internet network."
        },
        {
            id: 2,
            question: language === 'kurdish'
                ? "کام لەمە نوێنەرایەتی دەکات باشترین ڕێگای پاراستنی زانیاری لەسەر دیسکی ڕەق؟"
                : "Which of these represents the best way to protect data on a hard drive?",
            options: [
                {
                    id: 1,
                    text: "FAT32",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish' ? "NTFS بەبێ پاراستن" : "NTFS without protection",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish' ? "BitLocker یان AES encryption" : "BitLocker or AES encryption",
                    correct: true
                },
                {
                    id: 4,
                    text: language === 'kurdish' ? "Zip فایل بە وشەی نهێنی" : "Zip file with password",
                    correct: false
                }
            ],
            explanation: language === 'kurdish'
                ? "BitLocker و AES شێوازی پاراستنی تەواوی دیسک (Full Disk Encryption) دابین دەکەن."
                : "BitLocker and AES provide Full Disk Encryption (FDE) protection."
        },
        {
            id: 3,
            question: language === 'kurdish'
                ? "کام لەمە باشترین ڕێگایە بۆ پاراستنی زانیاری لە مۆبایل؟"
                : "Which of these is the best way to protect data on a mobile phone?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish' ? "وشەی نهێنی ٤ ڕەقەمەری" : "4-digit PIN",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish' ? "نمایشەکانی قۆڵ (Pattern)" : "Screen pattern",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish' ? "پەنجەنووس یان دەماغنووس" : "Fingerprint or face recognition",
                    correct: true
                },
                {
                    id: 4,
                    text: language === 'kurdish' ? "بێ پاراستن" : "No protection",
                    correct: false
                }
            ],
            explanation: language === 'kurdish'
                ? "پەنجەنووس و دەماغنووس پاراستنی زیاتر دابین دەکەن چونکە کۆپی کردنیان قورسە."
                : "Fingerprint and face recognition provide better protection as they're harder to replicate."
        }
    ];

    const handleAnswer = (isCorrect, explanation) => {
        if (isCorrect) {
            setScore(score + 10);
        }

        if (currentQuestion < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
            setTimeout(() => completeChallenge(score + (isCorrect ? 10 : 0)), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: پاراستنی زانیاری' : 'Activity 2: Data Protection'}</h3>
            <p className="instructions">
                {language === 'kurdish' ? 'وەڵامی پرسیارەکانی خوارەوە بدەوە' : 'Answer the following questions'}
            </p>

            {!showResult ? (
                <>
                    <div className="question-progress">
                        {language === 'kurdish'
                            ? `پرسیار ${currentQuestion} لە ${questions.length}`
                            : `Question ${currentQuestion} of ${questions.length}`}
                    </div>

                    <div className="question-box">
                        <h4>{questions[currentQuestion - 1].question}</h4>
                    </div>

                    <div className="options-list">
                        {questions[currentQuestion - 1].options.map(option => (
                            <div
                                key={option.id}
                                className="option-item"
                                onClick={() => handleAnswer(option.correct, questions[currentQuestion - 1].explanation)}
                            >
                                <input type="radio" name={`question-${currentQuestion}`} />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={`feedback ${score >= 20 ? 'correct' : 'incorrect'}`}>
                    {score >= 20 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ زانیاری باشت هەیە لەسەر پاراستنی زانیاری.'
                                    : 'Excellent! You have good knowledge about data protection.'}
                            </p>
                            <p>
                                {language === 'kurdish'
                                    ? 'کۆی خاڵەکان: '
                                    : 'Total score: '}{score}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'پێویستە زانیاری زیاتر بخوێنیتەوە لەسەر پاراستنی زانیاری.'
                                    : 'You should learn more about data protection.'}
                            </p>
                            <p>
                                {language === 'kurdish'
                                    ? 'کۆی خاڵەکان: '
                                    : 'Total score: '}{score}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default EncryptionChallenge;