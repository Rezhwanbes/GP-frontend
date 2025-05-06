import React, { useState, useEffect } from 'react';
import '../assets/styles/QuizPoints.css';
import { FaTrophy, FaStar, FaTasks } from 'react-icons/fa';
import { useLanguage } from "../LanguageContext.jsx";

const QuizPoints = () => {
    const [userData, setUserData] = useState({
        totalPoints: 0,
        completedLevels: 0,
        rankKey: 'beginner'
    });
    const [loading, setLoading] = useState(true);
    const { translations, language } = useLanguage();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const progressResponse = await fetch('http://localhost:5000/api/auth/progress', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const scoresResponse = await fetch('http://localhost:5000/api/auth/scores', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (progressResponse.ok && scoresResponse.ok) {
                    const progressData = await progressResponse.json();
                    const scoresData = await scoresResponse.json();

                    setUserData({
                        totalPoints: scoresData.highest_score || 0,
                        completedLevels: progressData.completed_levels?.length || 0,
                        rank: getRank(scoresData.highest_score || 0)
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const getRank = (points) => {
        if (points >= 500) return translations[language].expert;
        if (points >= 300) return translations[language].advanced;
        if (points >= 100) return translations[language].intermediate;
        return translations[language].beginner;
    };

    if (loading) {
        return <div className="quiz-points loading">{translations[language].loadingText || "Loading..."}</div>;
    }

    return (
        <section className="quiz-points" id="quiz-points">
            <div className="container">
                <div className="section-title">
                    <h2>{translations[language].pointsTitle}</h2>
                    <p>{translations[language].pointsSubtitle}</p>
                </div>
                <div className="points-container">
                    <div className="points-card">
                        <div className="points-header">
                            <h3>{translations[language].gamePoints}</h3>
                        </div>
                        <div className="points-content">
                            <div className="points-item">
                                <div className="points-icon">
                                    <FaTrophy />
                                </div>
                                <div className="points-info">
                                    <h4>{translations[language].totalPoints}</h4>
                                    <p>{userData.totalPoints} {translations[language].points}</p>
                                </div>
                            </div>
                            <div className="points-item">
                                <div className="points-icon">
                                    <FaStar />
                                </div>
                                <div className="points-info">
                                    <h4>{translations[language].rank}</h4>
                                    <p>{translations[language].ranks[userData.rankKey]}</p>
                                </div>
                            </div>
                            <div className="points-item">
                                <div className="points-icon">
                                    <FaTasks />
                                </div>
                                <div className="points-info">
                                    <h4>{translations[language].completed}</h4>
                                    <p>{userData.completedLevels}/10 {translations[language].levels}</p>
                                </div>
                            </div>
                            <a href="#game-chapters" className="btn">{translations[language].startGame}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuizPoints;