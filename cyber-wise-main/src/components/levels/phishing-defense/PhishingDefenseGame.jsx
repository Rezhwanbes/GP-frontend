import React, {useEffect, useState, useContext} from 'react';
import '../../../assets/styles/games/phishing-defense-game.css'
import FinalModal from "../phone-protection/FinalModal.jsx";
import ResponseChallenge from "./ResponseChallenge.jsx";
import LinkChallenge from "./LinkChallenge.jsx";
import EmailChallenge from "./EmailChallenge.jsx";
import Quiz from '../../Quiz';
import { useNavigate } from 'react-router-dom';
import {useLanguage} from "../../../LanguageContext.jsx";

const Level3 = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Verify token on component mount
    useEffect(() => {
        if (!token) {
            setError(language === 'kurdish' ? 'تۆکنی چوونەژوورەوە نییە' : 'No login token found');
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
                    level: 3,
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
            const response = await fetch(`http://localhost:5000/api/auth/progress/3`, {
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
            navigate("/scam-prevention");
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
        <div className="level3-container">
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()}>
                        {language === 'kurdish' ? 'هەوڵبدەرەوە' : 'Try again'}
                    </button>
                </div>
            )}
            <h2 className="level-title">
                {language === 'kurdish' ? 'ئاستی ٣: بەرگری لە هێرشەکانی فیشینگ' : 'Level 3: Phishing Attack Defense'}
            </h2>

            {/* Added gameplay instructions */}
            <div className="game-instructions">
                <h3>{language === 'kurdish' ? 'چۆنیەتی یاری کردن' : 'How to Play'}</h3>
                <ul>
                    {language === 'kurdish' ? (
                        <>
                            <li> سێ بەشی جیاواز دەبێت تەواو بکەیت: ئیمەیڵی فیشینگ، لینکی ساختە، و وەڵامدانەوەی ڕاست</li>
                            <li> لە هەر بەشێکدا، دەبێت هێرشی فیشینگ دیاری بکەیت و وەڵامی راست بدەیتەوە</li>
                            <li> خاڵ بۆ هەر وەڵامێکی راست وەردەگریت</li>
                            <li> دوای تەواوکردنی سێ بەشەکە، پێویستە تێستێک بکەیت</li>
                            <li> کۆی خاڵەکانت لە هەموو بەشەکاندا دیاری دەکات ئایا ئاستەکە تەواو کردووە یان نا</li>
                        </>
                    ) : (
                        <>
                            <li>You'll complete three different challenges: Phishing emails, Fake links, and Proper responses</li>
                            <li>In each challenge, identify the phishing attempt and select the correct action</li>
                            <li>Earn points for each correct identification and response</li>
                            <li>After completing all challenges, you'll take a final quiz</li>
                            <li>Your total score from all sections determines if you pass the level</li>
                        </>
                    )}
                </ul>
            </div>

            <p className="level-description">
                {language === 'kurdish'
                    ? 'لەم ئاستەدا فێری ناسینەوە و بەرگری لە هێرشەکانی فیشینگ دەبیت لە ڕێگەی چەند چالاکییەکی پێشکەوتوو.'
                    : 'In this level, you will learn to identify and defend against phishing attacks through several advanced activities.'}
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '١. ناسینەوەی ئیمەیڵی فیشینگ' : '1. Identify phishing emails'}
                </div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٢. ناسینەوەی لینکی ساختە' : '2. Identify fake links'}
                </div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٣. وەڵامدانەوەی ڕاست' : '3. Correct response'}
                </div>
            </div>

            {currentChallenge === 1 && (
                <EmailChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <LinkChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <ResponseChallenge completeChallenge={completeChallenge} />
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

export default Level3;