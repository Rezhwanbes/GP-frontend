import React, {useEffect, useState} from 'react';
import '../../../assets/styles/games/phone-protection.css';
import SecuritySetupChallenge from './SecuritySetupChallenge';
import PhishingChallenge from './PhishingChallenge';
import AppPermissionChallenge from './AppPermissionChallenge';
import NetworkSecurityChallenge from './NetworkSecurityChallenge';
import FinalModal from './FinalModal';
import Quiz from '../../Quiz';
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../../LanguageContext.jsx";

const PhoneProtection = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const [error, setError] = useState(null);
    const levelNumber = 5;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError(language === 'kurdish' ? 'تۆکنی چوونەژوورەوە نییە' : 'No login token');
            navigate('/');
            alert("you need login to access the routes routes")
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
            const response = await fetch(`http://localhost:5000/api/auth/progress/5`, {
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
        if (currentChallenge < 4) {
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
            navigate("/computer-protection");
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
        <div className="level5-container">
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()}>
                        {language === 'kurdish' ? 'هەوڵبدەرەوە' : 'Try again'}
                    </button>
                </div>
            )}
            <h2 className="level-title">
                {language === 'kurdish' ? `ئاستی ${levelNumber}: پاراستنی مۆبایل` : `Level ${levelNumber}: Mobile Protection`}
            </h2>

            {/* Added gameplay instructions */}
            <div className="game-instructions">
                <h3>{language === 'kurdish' ? 'چۆنیەتی یاری کردن' : 'How to Play'}</h3>
                <ul>
                    {language === 'kurdish' ? (
                        <>
                            <li> چوار بەشی جیاواز دەبێت تەواو بکەیت: ڕێکخستنی پاراستن، فێڵی سەمەرە، مۆڵەتی ئەپەکان، و پاراستنی تۆڕ</li>
                            <li> لە هەر بەشێکدا، دەبێت وەڵامی راست بدەیتەوە بۆ کێشەکانی پاراستنی مۆبایل</li>
                            <li> خاڵ بۆ هەر وەڵامێکی راست وەردەگریت</li>
                            <li> دوای تەواوکردنی هەموو بەشەکان، پێویستە تێستێک بکەیت</li>
                            <li> کۆی خاڵەکانت لە هەموو بەشەکاندا دیاری دەکات ئایا ئاستەکە تەواو کردووە یان نا</li>
                        </>
                    ) : (
                        <>
                            <li>You'll complete four different sections: Security Setup, Phishing, App Permissions, and Network Security</li>
                            <li>In each section, solve mobile protection challenges by choosing correct answers</li>
                            <li>Earn points for each correct response</li>
                            <li>After completing all sections, you'll take a final quiz</li>
                            <li>Your total score across all sections determines if you pass the level</li>
                        </>
                    )}
                </ul>
            </div>

            <p className="level-description">
                {language === 'kurdish'
                    ? 'لەم ئاستەدا فێری پاراستنی مۆبایلەکەت دەبیت لە هەڕەشە جیاوازەکان وەک ڤایرۆس، فێڵی سەمەرە، و دەستڕاگەیشتنی نایاسایی.'
                    : 'In this level, you will learn how to protect your mobile device from various threats like viruses, phishing, and unauthorized access.'}
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '١. ڕێکخستنی پاراستن' : '1. Security Setup'}
                </div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٢. فێڵی سەمەرە' : '2. Phishing'}
                </div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٣. مۆڵەتی ئەپەکان' : '3. App Permissions'}
                </div>
                <div className={`progress-step ${currentChallenge >= 4 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٤. پاراستنی تۆڕ' : '4. Network Security'}
                </div>
            </div>

            {currentChallenge === 1 && (
                <SecuritySetupChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <PhishingChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <AppPermissionChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 4 && (
                <NetworkSecurityChallenge completeChallenge={completeChallenge} />
            )}

            {showFinalModal && (
                <FinalModal
                    score={totalScore}
                    onClose={handleFinalModalClose}
                    level={levelNumber}
                />
            )}
        </div>
    );
};

export default PhoneProtection;