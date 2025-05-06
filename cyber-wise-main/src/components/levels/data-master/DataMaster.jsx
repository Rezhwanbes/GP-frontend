import React, { useState, useEffect } from 'react';
import '../../../assets/styles/games/data-master.css';
import DataBreachChallenge from './DataBreachChallenge';
import EncryptionChallenge from './EncryptionChallenge';
import APISecurityChallenge from './APISecurityChallenge';
import FinalExam from './FinalExam';
import DataMasterFinalModal from './DataMasterFinalModal';
import Quiz from '../../Quiz';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../../LanguageContext.jsx";

const DataMaster = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];
    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [unlockedFinal, setUnlockedFinal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const levelNumber = 10;
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError(language === 'kurdish' ? 'تۆکنی چوونەژوورەوە نییە' : 'No login token found');
            navigate('/');
            alert("you need login to access the routes routes")
        }
    }, [token, navigate, language]);

    // Save score to backend
    const saveScore = async (score) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    level: levelNumber,
                    score: score
                })
            });

            if (!response.ok) {
                throw new Error(language === 'kurdish' ? 'پاشەکەوتکردنی خاڵ سەرنەکەوت' : 'Failed to save score');
            }
            return await response.json();
        } catch (error) {
            console.error('Error saving score:', error);
            throw error;
        }
    };

    // Mark level as completed
    const markLevelCompleted = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/progress/${levelNumber}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(language === 'kurdish' ? 'تەواوکردنی ئاست سەرنەکەوت' : 'Failed to mark level as completed');
            }
            return await response.json();
        } catch (error) {
            console.error('Error marking level as completed:', error);
            throw error;
        }
    };

    const completeChallenge = (score) => {
        const newTotalScore = totalScore + score;
        setTotalScore(newTotalScore);

        if (currentChallenge < 4) {
            setCurrentChallenge(current => current + 1);
            if (currentChallenge === 3) {
                setUnlockedFinal(true);
                setShowFinalModal(true)
            }
        }
    };

    const handleFinalExamComplete = async (score) => {
        const newTotalScore = totalScore + score;
        setTotalScore(newTotalScore);
        setShowFinalModal(false)
        setShowQuiz(true);
    };

    const handleQuizComplete = async () => {
        try {
            setError(null);

            // 1. Save score first
            await saveScore();

            // 2. Mark level as completed
            const result = await markLevelCompleted();
            console.log('Completion result:', result);

            // 3. Only navigate if successful
            navigate("/data-master");

        } catch (error) {
            setError(error.message);
            console.error('Completion error:', error);
        }
    };
    if (showQuiz) {
        return (
            <Quiz
                level={levelNumber}
                gameScore={totalScore}
                onComplete={handleQuizComplete}
            />
        );
    }

    return (
        <div className="data-master-container">
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
                    ? 'ئاستی کۆتایی: زانای زانیاری'
                    : 'Final Level: Data Master'}
            </h2>

            {/* Added gameplay instructions */}
            <div className="game-instructions">
                <h3>{language === 'kurdish' ? 'چۆنیەتی یاری کردن' : 'How to Play'}</h3>
                <ul>
                    {language === 'kurdish' ? (
                        <>
                            <li> سێ بەشی سەرەکی دەبێت تەواو بکەیت: ناسینەوەی شکاندنی زانیاری، پاراستنی زانیاری، و ئاسایشی API</li>
                            <li> لە هەر بەشێکدا، دەبێت کێشە ئاسایشییەکان دیاری بکەیت و چارەسەری ڕاست بدەیتەوە</li>
                            <li> خاڵ بۆ هەر وەڵامێکی راست وەردەگریت</li>
                            <li> دوای تەواوکردنی سێ بەشە سەرەکییەکان، تاقیکردنەوەیەکی کۆتایی دەکرێت</li>
                            <li> کۆی گشتی خاڵەکانت دیاری دەکات ئایا ئاستەکە تەواو کردووە یان نا</li>
                        </>
                    ) : (
                        <>
                            <li>Complete three main sections: Data breach identification, Data protection, and API security</li>
                            <li>In each section, identify security issues and provide correct solutions</li>
                            <li>Earn points for each correct answer</li>
                            <li>After completing all three sections, you'll take a final exam</li>
                            <li>Your total score from all sections determines if you pass the level</li>
                        </>
                    )}
                </ul>
            </div>

            <p className="level-description">
                {language === 'kurdish'
                    ? 'لەم ئاستەدا تواناکانی پاراستنی زانیاری و سیستەمەکانت پێوانە دەکرێت. ئەم ئاستە تایبەتە بە پاراستنی زانیاری و ناسینەوەی هەڕەشەکانی ئاسایشی سایبەری.'
                    : 'This level tests your data protection and system security skills. It focuses on data security and identifying cybersecurity threats.'}
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '١. ناسینەوەی شکاندنی زانیاری' : '1. Data Breach Identification'}
                </div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٢. پاراستنی زانیاری' : '2. Data Protection'}
                </div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٣. ئاسایشی API' : '3. API Security'}
                </div>
                {unlockedFinal && (
                    <div className={`progress-step ${currentChallenge >= 4 ? 'active' : ''}`}>
                        {language === 'kurdish' ? '٤. تاقیکردنەوەی کۆتایی' : '4. Final Exam'}
                    </div>
                )}
            </div>

            {currentChallenge === 1 && (
                <DataBreachChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <EncryptionChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <APISecurityChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 4 && !showQuiz && (
                <FinalExam
                    completeChallenge={handleFinalExamComplete}
                />
            )}

            {showFinalModal && (
                <DataMasterFinalModal
                    score={totalScore}
                    onClose={handleFinalExamComplete}
                />
            )}
        </div>
    );
};

export default DataMaster;