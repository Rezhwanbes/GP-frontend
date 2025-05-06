import React, {useEffect, useState} from 'react';
import '../../../assets/styles/games/safe-online-search.css';
import UrlAnalysisChallenge from './UrlAnalysisChallenge';
import SearchEngineChallenge from './SearchEngineChallenge';
import PrivacySettingsChallenge from './PrivacySettingsChallenge';
import FinalModal from '../phone-protection/FinalModal.jsx';
import {useNavigate} from "react-router-dom";
import Quiz from "../../Quiz.jsx";
import {useLanguage} from "../../../LanguageContext.jsx";

const SafeOnlineSearch = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];
    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const levelNumber = 7;
    const [error, setError] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);

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
            const response = await fetch(`http://localhost:5000/api/auth/progress/7`, {
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
            navigate("/network-protection");
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
                    ? `ئاستی ${levelNumber}: گەڕان بە سەلامەتی لەسەر ئینتەرنێت`
                    : `Level ${levelNumber}: Safe Online Searching`}
            </h2>

            {/* Added gameplay instructions */}
            <div className="game-instructions">
                <h3>{language === 'kurdish' ? 'چۆنیەتی یاری کردن' : 'How to Play'}</h3>
                <ul>
                    {language === 'kurdish' ? (
                        <>
                            <li> سێ بەشی جیاواز دەبێت تەواو بکەیت: شیکردنەوەی ناونیشانی وێب، مووتۆری گەڕان، و ڕێکخستنەکانی پاراستنی نهێنی</li>
                            <li> لە هەر بەشێکدا، دەبێت هەڵبژاردەی سەلامەت دیاری بکەیت و وەڵامی راست بەیت</li>
                            <li> خاڵ بۆ هەر وەڵامێکی راست وەردەگریت</li>
                            <li> دەبێت ناونیشانی وێبی مەترسیدار و فێڵکارانە دیاری بکەیت</li>
                            <li> دوای تەواوکردنی سێ بەشەکە، پێویستە تێستێک بکەیت</li>
                        </>
                    ) : (
                        <>
                            <li>You'll complete three different sections: URL analysis, Safe search engines, and Privacy settings</li>
                            <li>In each section, identify safe choices and select correct answers</li>
                            <li>You'll earn points for each correct decision</li>
                            <li>You'll need to identify dangerous or scam website URLs</li>
                            <li>After all sections, you'll take a final quiz to test your knowledge</li>
                        </>
                    )}
                </ul>
            </div>

            <p className="level-description">
                {language === 'kurdish'
                    ? 'لەم ئاستەدا فێری گەڕان بە سەلامەتی دەبیت لەسەر ئینتەرنێت، ناسینەوەی لینکی سەلامەت، ڕێگای پاراستنی پاراستنی نهێنی، و بەکارهێنانی مووتۆری گەڕانی سەلامەت.'
                    : 'In this level, you will learn safe online searching techniques, how to identify secure links, protect your privacy, and use safe search engines.'}
            </p>

            <div className="challenge-progress">
                <div className={`progress-step ${currentChallenge >= 1 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '١. شیکردنەوەی ناونیشانی وێب' : '1. URL Analysis'}
                </div>
                <div className={`progress-step ${currentChallenge >= 2 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٢. مووتۆری گەڕانی سەلامەت' : '2. Safe Search Engine'}
                </div>
                <div className={`progress-step ${currentChallenge >= 3 ? 'active' : ''}`}>
                    {language === 'kurdish' ? '٣. ڕێکخستنەکانی پاراستنی نهێنی' : '3. Privacy Settings'}
                </div>
            </div>

            {currentChallenge === 1 && (
                <UrlAnalysisChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 2 && (
                <SearchEngineChallenge completeChallenge={completeChallenge} />
            )}

            {currentChallenge === 3 && (
                <PrivacySettingsChallenge completeChallenge={completeChallenge} />
            )}

            {showFinalModal && (
                <FinalModal
                    score={totalScore}
                    onClose={handleFinalModalClose}
                    level={7}
                    levelTitle={language === 'kurdish' ? 'گەڕان بە سەلامەتی لەسەر ئینتەرنێت' : 'Safe Online Searching'}
                />
            )}
        </div>
    );
};

export default SafeOnlineSearch;