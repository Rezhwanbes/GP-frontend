import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const NetworkSecurityChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentScenario, setCurrentScenario] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const scenarios = [
        {
            id: 1,
            description: language === 'kurdish'
                ? "لە کافێ شەیت کە وایفای کراوەی بێ پارۆلەی بەردەستە. چی دەکەیت؟"
                : "You're at a cafe with an open, password-free WiFi. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "پەیوەندیم پێوە دەکەم بە وایفایەکە بۆ ئەوەی ئینتەرنێت بەکاربهێنم"
                        : "Connect to the WiFi to use the internet",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "پەیوەندی VPN دەکەم پێش پەیوەستبوون بە وایفایەکە"
                        : "Connect to VPN before using the WiFi",
                    correct: true
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "هیچ پەیوەندییەک ناکەم و داتای مۆبایل بەکاردەهێنم"
                        : "Don't connect and use mobile data",
                    correct: true
                }
            ]
        },
        {
            id: 2,
            description: language === 'kurdish'
                ? "پەیامێکت پێگەیشت کە دەڵێت پێویستە بچیتە سەر لینکێک بۆ نوێکردنەوەی ئەپێکی بانکی. چی دەکەیت؟"
                : "You received a message saying you need to click a link to update a banking app. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "کلیک دەکەم لەسەر لینکەکە چونکە پەیامەکە لە بانکەوەیە"
                        : "Click the link because the message is from the bank",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "ئەپەکە دەکەمەوە و لە نێو ئەپەکە خۆی نوێی دەکەمەوە"
                        : "Open the app and update it from within",
                    correct: true
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "پەیوەندی بە بانکەکە دەکەم بۆ دڵنیابوونەوە"
                        : "Contact the bank to verify",
                    correct: true
                }
            ]
        },
        {
            id: 3,
            description: language === 'kurdish'
                ? "کەسێک لە کافێکەوە داوات لێدەکات پەیوەندی بلوتووس بکەیت بۆ گواستنەوەی فایل. چی دەکەیت؟"
                : "Someone at a cafe asks you to connect via Bluetooth to transfer a file. What do you do?",
            options: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "پەیوەندی دەکەم چونکە فایلەکە زۆر بچووکە"
                        : "Connect because the file is very small",
                    correct: false
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "پەیوەندی ناکەم و داوای ئیمەیڵ دەکەم"
                        : "Don't connect and ask for email",
                    correct: true
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "پەیوەندی ناکەم و داوای یو ئێس بی دەکەم"
                        : "Don't connect and ask for USB",
                    correct: true
                }
            ]
        }
    ];

    const handleResponse = (optionId) => {
        const isCorrect = scenarios[currentScenario].options.find(opt => opt.id === optionId)?.correct;
        setUserResponses([...userResponses, {
            scenarioId: scenarios[currentScenario].id,
            responseId: optionId,
            correct: isCorrect
        }]);

        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
        } else {
            setShowResult(true);
            const score = calculateScore();
            setTimeout(() => completeChallenge(score), 3000);
        }
    };

    const calculateScore = () => {
        const correctCount = userResponses.filter(response => response.correct).length;
        return Math.floor((correctCount / scenarios.length) * 40);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٤: پاراستنی تۆڕ و پەیوەندییەکان' : 'Activity 4: Network and Connection Protection'}</h3>

            {!showResult ? (
                <>
                    <div className="scenario-box">
                        <p>{scenarios[currentScenario].description}</p>
                    </div>

                    <div className="response-options">
                        {scenarios[currentScenario].options.map(option => (
                            <div
                                key={option.id}
                                className="response-card"
                                onClick={() => handleResponse(option.id)}
                            >
                                <input type="radio" name={`scenario-${scenarios[currentScenario].id}`} />
                                <label>{option.text}</label>
                            </div>
                        ))}
                    </div>

                    <div className="security-tips">
                        <h5>{language === 'kurdish' ? 'ڕێنمایی پاراستن:' : 'Security Tips:'}</h5>
                        <ul>
                            <li>
                                {language === 'kurdish'
                                    ? 'هەرگیز پەیوەندی مەکە بە وایفای بێ پارۆلە بێ VPN.'
                                    : 'Never connect to password-free WiFi without VPN.'}
                            </li>
                            <li>
                                {language === 'kurdish'
                                    ? 'هەرگیز کلیک مەکە لەسەر لینکی بانک لە پەیامەکاندا.'
                                    : 'Never click on bank links in messages.'}
                            </li>
                            <li>
                                {language === 'kurdish'
                                    ? 'بلوتووسی نەناسراو بەکارمەهێنە بۆ گواستنەوەی فایل.'
                                    : "Don't use unknown Bluetooth for file transfer."}
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <div className={`feedback ${calculateScore() >= 30 ? 'correct' : 'incorrect'}`}>
                    {calculateScore() >= 30 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە سەرکەوتوویی خۆت پاراست لە هەڕەشەکانی تۆڕ.'
                                    : 'Great job! You successfully protected yourself from network threats.'}
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
                                    ? 'هەندێک هەڵەت کردووە. لەبیرت بێت کە زۆربەی هەڕەشەکان لە ڕێگەی تۆڕەوە دێن.'
                                    : 'You made some mistakes. Remember most threats come through networks.'}
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

export default NetworkSecurityChallenge;