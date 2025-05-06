import React, {useEffect, useState} from 'react';
import '../../../assets/styles/games/data-protection.css';
import AccessControlChallenge from "./AccessControlChallenge.jsx";
import DataMinimizationChallenge from "./DataMinimizationChallenge.jsx";
import DataRetentionChallenge from "./DataRetentionChallenge.jsx";
import SecureSharingChallenge from "./SecureSharingChallenge.jsx";
import FinalModal from "../phone-protection/FinalModal.jsx";
import Quiz from "../../Quiz.jsx";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../../LanguageContext.jsx";

const DataProtection = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const levelNumber = 9;
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
            const response = await fetch(`http://localhost:5000/api/auth/progress/9`, {
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
            navigate("/data-master");
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
        <div className="level8-container">
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
                    ? `ئاستی ${levelNumber}: پاراستنی زانیاری (پێشکەوتوو)`
                    : `Level ${levelNumber}: Advanced Data Protection`}
            </h2>

            {/* Added gameplay instructions */}
            <div className="game-instructions">
                <h3>{language === 'kurdish' ? 'چۆنیەتی یاری کردن' : 'How to Play'}</h3>
                <ul>
                    {language === 'kurdish' ? (
                        <>
                            <li>١. چوار بەشی جیاواز دەبێت تەواو بکەیت: کەمکردنەوەی زانیاری، کۆنترۆلی دەستگەیشتن، پاراستنی ماوەی زانیاری، و هاوبەشی سەلامەت</li>
                            <li>٢. لە هەر بەشێکدا، دەبێت باشترین ڕێگا بۆ پاراستنی زانیاری دیاری بکەیت</li>
                            <li>٣. خاڵ بۆ هەر وەڵامێکی راست وەردەگریت</li>
                            <li>٤. دوای تەواوکردنی هەموو بەشەکان، پێویستە تێستێک بکەیت</li>
                            <li> کۆی خاڵەکانت لە هەموو بەشەکاندا دیاری دەکات ئایا ئاستەکە تەواو کردووە یان نا</li>
                        </>
                    ) : (
                        <>
                            <li>You'll need to complete four different sections: Data Minimization, Access Control, Data Retention, and Secure Sharing</li>
                            <li>In each section, choose the best practices for protecting sensitive data</li>
                            <li>You'll earn points for each correct answer</li>
                            <li>After completing all sections, you'll take a final quiz</li>
                            <li>Your total score from all sections determines if you pass the level</li>
                        </>
                    )}
                </ul>
            </div>

            <p className="level-description">
                {language === 'kurdish'
                    ? 'لەم ئاستەدا فێری پاراستنی زانیاری کەسی و کارگێڕی دەبیت بە شێوەیەکی پێشکەوتوو.'
                    : 'In this level, you will learn advanced techniques for protecting personal and organizational data.'}
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '١. کەمکردنەوەی زانیاری' : '1. Data Minimization'}
                </div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٢. کۆنترۆلی دەستگەیشتن' : '2. Access Control'}
                </div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٣. پاراستنی ماوەی زانیاری' : '3. Data Retention'}
                </div>
                <div className={`progress-step ${currentChallenge >= 4 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٤. هاوبەشی سەلامەت' : '4. Secure Sharing'}
                </div>
            </div>

            {currentChallenge === 1 && (
                <DataMinimizationChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <AccessControlChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <DataRetentionChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 4 && (
                <SecureSharingChallenge completeChallenge={completeChallenge} />
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

export default DataProtection;