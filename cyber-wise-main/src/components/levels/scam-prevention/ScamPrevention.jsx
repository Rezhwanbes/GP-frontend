import React, {useEffect, useState, useContext} from 'react';
import '../../../assets/styles/games/scam-prevention.css';
import PhoneScamChallenge from "./PhoneScamChallenge.jsx";
import InternetScamChallenge from "./InternetScamChallenge.jsx";
import MoneyScamChallenge from "./MoneyScamChallenge.jsx";
import Quiz from "../../Quiz";
import FinalModal from "../phone-protection/FinalModal.jsx";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../../LanguageContext.jsx";

const ScamPrevention = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const [error, setError] = useState(null);
    const levelNumber = 4;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError(language === 'kurdish' ? 'تۆکنی چوونەژوورەوە نییە' : 'No login token found');
            navigate('/');
            alert("you need login to access the routes routes")
        }
    }, [token, navigate, language]);

    const saveScamScore = async () => {
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
            const response = await fetch(`http://localhost:5000/api/auth/progress/4`, {
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

    const handleScamModalClose = () => {
        setShowFinalModal(false);
        setShowQuiz(true);
    };

    const handleQuizComplete = async () => {
        try {
            setError(null);
            await saveScamScore();
            const result = await markLevelCompleted();
            console.log('Completion result:', result);
            navigate("/phone-protection");
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
        <div className="level4-container">
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
                    ? `ئاستی ${levelNumber}: پاراستنی خۆت لە فێڵەکانی سەمەرە`
                    : `Level ${levelNumber}: Protecting Yourself from Scams`}
            </h2>

            {/* Added gameplay instructions */}
            <div className="game-instructions">
                <h3>{language === 'kurdish' ? 'چۆنیەتی یاری کردن' : 'How to Play'}</h3>
                <ul>
                    {language === 'kurdish' ? (
                        <>
                            <li> سێ بەشی جیاواز دەبێت تەواو بکەیت: فێڵی تەلەفۆن، فێڵی ئینتەرنێت، و فێڵی دراو</li>
                            <li> لە هەر بەشێکدا، دەبێت فێڵەکە دیاری بکەیت و وەڵامی راست بەیت</li>
                            <li> خاڵ بۆ هەر وەڵامێکی راست وەردەگریت</li>
                            <li> دوای تەواوکردنی سێ بەشەکە، پێویستە تێستێک بکەیت</li>
                            <li> کۆی خاڵەکانت لە هەموو بەشەکاندا دیاری دەکات ئایا ئاستەکە تەواو کردووە یان نا</li>
                        </>
                    ) : (
                        <>
                            <li>You'll need to complete three different sections: Phone scams, Internet scams, and Money scams</li>
                            <li>In each section, identify the scam and choose the correct response</li>
                            <li>You'll earn points for each correct answer</li>
                            <li>After completing all three sections, you'll take a final quiz</li>
                            <li>Your total score from all sections determines if you pass the level</li>
                        </>
                    )}
                </ul>
            </div>

            <p className="level-description">
                {language === 'kurdish'
                    ? 'لەم ئاستەدا فێری ناسینەوە و پاراستنی خۆت دەبیت لە فێڵە جیاوازەکانی سەمەرە لەسەر ئینتەرنێت و ژمارە مۆبایل.'
                    : 'In this level, you will learn to identify and protect yourself from various scams on the internet and mobile phones.'}
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '١. فێڵی پەیوەندی تەلەفۆنی' : '1. Phone Call Scams'}
                </div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٢. فێڵی ئینتەرنێتی' : '2. Internet Scams'}
                </div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٣. فێڵی دراو' : '3. Money Scams'}
                </div>
            </div>

            {currentChallenge === 1 && (
                <PhoneScamChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <InternetScamChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <MoneyScamChallenge completeChallenge={completeChallenge} />
            )}

            {showFinalModal && (
                <FinalModal
                    score={totalScore}
                    onClose={handleScamModalClose}
                />
            )}
        </div>
    );
};

export default ScamPrevention;