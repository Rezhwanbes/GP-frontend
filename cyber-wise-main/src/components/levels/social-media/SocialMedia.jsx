import React, {useEffect, useState} from 'react';
import '../../../assets/styles/games/social-media.css';
import Challenge1 from './challenges/Challenge1';
import Challenge2 from './challenges/Challenge2';
import Challenge3 from './challenges/Challenge3';
import LevelCompleted from './challenges/LevelCompleted';
import Quiz from '../../Quiz';
import { useNavigate } from "react-router-dom";
import {useLanguage} from "../../../LanguageContext.jsx";

const SocialMedia = () => {
    const { language, translations } = useLanguage();
    const t = translations[language];
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [currentScore, setCurrentScore] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [hasCompletedLevel, setHasCompletedLevel] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError(language === 'kurdish' ? 'تۆکنی چوونەژوورەوە نییە' : 'No login token found');
            navigate('/');
            alert("you need login to access the routes")
        }
    }, [token, navigate, language]);



    // Save score to backend
    const saveScore = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    level: 2, // Update this to the correct level number
                    score: currentScore
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save score');
            }
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };

    // Mark level as completed
    const markLevelCompleted = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/progress/2`, { // Update level number
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to mark level as completed');
            }
        } catch (error) {
            console.error('Error marking level as completed:', error);
        }
    };

    const updateScore = (points) => {
        setCurrentScore(prev => prev + points);
    };

    const goToNextChallenge = (challengeNumber) => {
        setCurrentChallenge(challengeNumber);
        if (challengeNumber === 4) {
            setTotalScore(currentScore);
            setShowQuiz(true);
        }
    };

    const handleQuizComplete = async () => {
        try {
            await saveScore();
            await markLevelCompleted();
            setHasCompletedLevel(true);
            setShowQuiz(false);
            navigate("/phishing-defense-game")
        } catch (error) {
            console.error('Error completing level:', error);
        }
    };



    if (showQuiz) {
        return (
            <Quiz
                level={2} // Update to current level
                gameScore={currentScore}
                onComplete={handleQuizComplete}
            />
        );
    }
    return (
        <div className="container">
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()}>
                        {language === 'kurdish' ? 'هەوڵبدەرەوە' : 'Try again'}
                    </button>
                </div>
            )}
            <div className="game-container">
                <div className="game-header">
                    <div className="level-indicator">
                        <div className="level-badge">
                            {language === 'kurdish' ? 'ئاستی ٢' : 'Level 2'}
                        </div>
                        <h2>{t.socialMedia}</h2>
                    </div>
                    <div className="score-display">
                        <i className="fas fa-star"></i>
                        {language === 'kurdish' ? 'خاڵ:' : 'Score:'}
                        <span id="currentScore">{currentScore}</span>
                    </div>
                </div>

                <div className="game-content">
                    {currentChallenge === 1 && (
                        <Challenge1
                            updateScore={updateScore}
                            goToNextChallenge={goToNextChallenge}
                        />
                    )}

                    {currentChallenge === 2 && (
                        <Challenge2
                            updateScore={updateScore}
                            goToNextChallenge={goToNextChallenge}
                        />
                    )}

                    {currentChallenge === 3 && (
                        <Challenge3
                            updateScore={updateScore}
                            goToNextChallenge={goToNextChallenge}
                        />
                    )}

                    {currentChallenge === 4 && !showQuiz && (
                        <LevelCompleted score={currentScore} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;