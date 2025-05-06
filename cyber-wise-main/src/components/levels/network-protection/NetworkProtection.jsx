import React, {useEffect, useState} from 'react';
import '../../../assets/styles/games/network-protection.css';
import FirewallChallenge from './FirewallChallenge';
import EncryptionChallenge from './EncryptionChallenge';
import IntrusionDetectionChallenge from './IntrusionDetectionChallenge';
import FinalModal from '../phone-protection/FinalModal.jsx';
import Quiz from "../../Quiz.jsx";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../../LanguageContext.jsx";

const NetworkProtection = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const levelNumber = 8;
    const [error, setError] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        if (!token) {
            setError(language === 'kurdish' ? 'تۆکنی چوونەژوورەوە نییە' : 'No login token found');
            navigate('/');
            alert(language === 'kurdish' ? "پێویستە چوونەژوورەوە بکەیت بۆ چوونە ناو ڕێگاکان" : "You need to login to access the routes")
        }
    }, [token, navigate, language]);

    const saveScore = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    level: levelNumber,
                    score: totalScore
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error ||
                    (language === 'kurdish' ? 'پاشەکەوتکردنی خاڵ سەرنەکەوت' : 'Failed to save score'));
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving score:', error);
            throw error;
        }
    };

    const markLevelCompleted = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/progress/8`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Backend error:', errorData);
                throw new Error(errorData.error ||
                    (language === 'kurdish' ? 'تەواوکردنی ئاست سەرنەکەوت' : 'Failed to complete level'));
            }

            const data = await response.json();
            console.log('Level completion response:', data);
            return data;
        } catch (error) {
            console.error('Error marking level complete:', error);
            throw error;
        }
    };

    const completeChallenge = (score) => {
        setTotalScore(prev => prev + score);
        if (currentChallenge < 3) {
            setCurrentChallenge(prev => prev + 1);
        } else {
            setShowFinalModal(true);
        }
    };

    const handleFinalModalClose = () => {
        setShowFinalModal(false);
        setShowQuiz(true);
    };

    const handleQuizComplete = async () => {
        try {
            setError(null);
            await saveScore();
            const result = await markLevelCompleted();
            console.log('Completion result:', result);
            navigate("/data-protection");
        } catch (error) {
            setError(error.message);
            console.error('Completion error:', error);
        }
    };

    if (showQuiz) {
        return (
            <Quiz
                level={3}
                gameScore={totalScore}
                onComplete={handleQuizComplete}
            />
        );
    }

    return (
        <div className="level7-container">
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()}>
                        {language === 'kurdish' ? 'هەوڵبدەرەوە' : 'Try again'}
                    </button>
                </div>
            )}
            <h2 className="level-title">
                {language === 'kurdish'
                    ? `ئاستی ${levelNumber}: پاراستنی تۆڕ`
                    : `Level ${levelNumber}: Network Protection`}
            </h2>

            {/* Added gameplay instructions */}
            <div className="game-instructions">
                <h3>{language === 'kurdish' ? 'چۆنیەتی یاری کردن' : 'How to Play'}</h3>
                <ul>
                    {language === 'kurdish' ? (
                        <>
                            <li> سێ بەشی جیاواز دەبێت تەواو بکەیت: دیوارە ئاگرین، شێوەزارکردن، و دۆزینەوەی هێرش</li>
                            <li> لە هەر بەشێکدا، دەبێت کێشە دیاری بکەیت و چارەسەری ڕاست هەڵبژێریت</li>
                            <li> خاڵ بۆ هەر وەڵامێکی راست وەردەگریت</li>
                            <li> دوای تەواوکردنی سێ بەشەکە، پێویستە تێستێک بکەیت</li>
                            <li> کۆی خاڵەکانت لە هەموو بەشەکاندا دیاری دەکات ئایا ئاستەکە تەواو کردووە یان نا</li>
                        </>
                    ) : (
                        <>
                            <li>You'll need to complete three different sections: Firewall, Encryption, and Intrusion Detection</li>
                            <li>In each section, identify network security issues and choose the correct solutions</li>
                            <li>You'll earn points for each correct answer</li>
                            <li>After completing all sections, you'll take a final quiz</li>
                            <li>Your total score from all sections determines if you pass the level</li>
                        </>
                    )}
                </ul>
            </div>

            <p className="level-description">
                {language === 'kurdish'
                    ? 'لەم ئاستەدا فێری پاراستنی تۆڕی کۆمپیوتەر و مۆبایل دەبیت لە هێرشەکانی ئینتەرنێت و ڕاژەکارە بێ مۆڵەتەکان.'
                    : 'In this level, you will learn to protect computer and mobile networks from internet attacks and unauthorized access.'}
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '١. دیوارە ئاگرین' : '1. Firewall'}
                </div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٢. شێوەزارکردن' : '2. Encryption'}
                </div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٣. دۆزینەوەی هێرش' : '3. Intrusion Detection'}
                </div>
            </div>

            {currentChallenge === 1 && (
                <FirewallChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <EncryptionChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <IntrusionDetectionChallenge completeChallenge={completeChallenge} />
            )}

            {showFinalModal && (
                <FinalModal
                    score={totalScore}
                    onClose={handleFinalModalClose}
                />
            )}
        </div>
    );
};

export default NetworkProtection;