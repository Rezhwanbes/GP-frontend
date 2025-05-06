import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const IntrusionDetectionChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentAlert, setCurrentAlert] = useState(0);

    const alerts = [
        {
            id: 1,
            description: language === 'kurdish'
                ? "سیستەمەکەت ڕاپۆرتی دەدات کە هەوڵێک هەیە بۆ چوونەژوورەوەی نەناسراو لە ڕێگەی پۆرتی SSH"
                : "Your system reports an attempted unauthorized login via SSH port",
            responses: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "پۆرتی SSH دابخەین و پەیوەندی بە بەڕێوەبەری تۆڕ بکەین"
                        : "Close SSH port and contact network administrator",
                    correct: true
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "هیچ نەکەین چونکە لەوانەیە هەڵە بێت"
                        : "Do nothing as it might be a false alarm",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "وشەی نهێنی SSH بگۆڕین بۆ وشەیەکی سادەتر"
                        : "Change SSH password to a simpler one",
                    correct: false
                }
            ]
        },
        {
            id: 2,
            description: language === 'kurdish'
                ? "دەرگایەکی پاشەکەوت (backdoor) دۆزراوەتەوە لە یەکێک لە کۆمپیوتەرەکانی تۆڕ"
                : "A backdoor has been detected on one of your network computers",
            responses: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "کۆمپیوتەرەکە جیا بکەینەوە لە تۆڕەکە و پشکنینی بکەین"
                        : "Isolate the computer from the network and investigate",
                    correct: true
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "هیچ نەکەین چونکە بێ زیانە"
                        : "Do nothing as it's harmless",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "هەموو کۆمپیوتەرەکان ڕیستارت بکەین"
                        : "Restart all computers",
                    correct: false
                }
            ]
        },
        {
            id: 3,
            description: language === 'kurdish'
                ? "چەندین هەوڵی چوونەژوورەوەی شکستخواردوو هەیە لە کۆمپیوتەری سەرەوە"
                : "Multiple failed login attempts detected on your server",
            responses: [
                {
                    id: 1,
                    text: language === 'kurdish'
                        ? "IP ناونیشانە بلۆککراوەکان ڕێکبخەین لە دیوارە ئاگرین"
                        : "Configure blocked IP addresses in the firewall",
                    correct: true
                },
                {
                    id: 2,
                    text: language === 'kurdish'
                        ? "هیچ نەکەین چونکە شکستیان هێناوە"
                        : "Do nothing since they failed",
                    correct: false
                },
                {
                    id: 3,
                    text: language === 'kurdish'
                        ? "کۆمپیوتەرەکە لەکاربخەین"
                        : "Shut down the computer",
                    correct: false
                }
            ]
        }
    ];

    const handleResponse = (responseId) => {
        setSelectedResponse(responseId);
        setShowFeedback(true);

        const isCorrect = alerts[currentAlert].responses.find(r => r.id === responseId)?.correct;
        if (isCorrect) {
            setTimeout(() => {
                if (currentAlert < alerts.length - 1) {
                    setCurrentAlert(currentAlert + 1);
                    setSelectedResponse(null);
                    setShowFeedback(false);
                } else {
                    completeChallenge(35);
                }
            }, 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: دۆزینەوەی هێرش' : 'Activity 3: Intrusion Detection'}</h3>
            <div className="alert-indicator">
                {language === 'kurdish'
                    ? `ڕاپۆرت ${currentAlert + 1} لە ${alerts.length}`
                    : `Alert ${currentAlert + 1} of ${alerts.length}`}
            </div>

            <div className="scenario-box alert-box">
                <h4>{language === 'kurdish' ? 'ئاگاداری:' : 'Alert:'}</h4>
                <p>{alerts[currentAlert].description}</p>
            </div>

            <div className="response-options">
                {alerts[currentAlert].responses.map(response => (
                    <div
                        key={response.id}
                        className={`response-card ${selectedResponse === response.id ? 'selected' : ''}`}
                        onClick={() => !showFeedback && handleResponse(response.id)}
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
                <div className={`feedback ${alerts[currentAlert].responses.find(r => r.id === selectedResponse)?.correct ? 'correct' : 'incorrect'}`}>
                    {alerts[currentAlert].responses.find(r => r.id === selectedResponse)?.correct ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'وەڵامێکی دروستە! ئەم کارە پاراستنی تۆڕەکەت زیاد دەکات.'
                                    : 'Correct response! This action enhances your network security.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'وەڵامێکی هەڵەە! ئەم کارە مەترسیدارە بۆ تۆڕەکەت.'
                                    : 'Incorrect response! This action could endanger your network.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default IntrusionDetectionChallenge;