import React, { useContext } from 'react';
import '../assets/styles/GameChapters.css';
import { AuthContext } from "../AuthContext.jsx";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";

const GameChapters = () => {
    const { user, userProgress, isLoading } = useContext(AuthContext);
    const { translations, language } = useLanguage();

    const chapters = [
        {
            id: 1,
            titleKey: "chapter1",
            subtitleKey: "chapter1Sub",
            levels: [
                {
                    id: 1,
                    titleKey: "passwordMasterGame",
                    descKey: "passwordDesc",
                    link: "/password-master",
                    locked: false
                },
                {
                    id: 2,
                    titleKey: "socialMedia",
                    descKey: "socialMediaDesc",
                    link: "/social-media",
                    locked: false
                }
            ]
        },
        {
            id: 2,
            titleKey: "chapter2",
            subtitleKey: "chapter2Sub",
            levels: [
                {
                    id: 3,
                    titleKey: "phishing",
                    descKey: "phishingDesc",
                    link: "/phishing-defense-game",
                    locked: false
                },
                {
                    id: 4,
                    titleKey: "fraud",
                    descKey: "fraudDesc",
                    link: "/scam-prevention",
                    locked: true
                }
            ]
        },
        {
            id: 3,
            titleKey: "chapter3",
            subtitleKey: "chapter3Sub",
            levels: [
                {
                    id: 5,
                    titleKey: "mobile",
                    descKey: "mobileDesc",
                    link: "/phone-protection",
                    locked: true
                },
                {
                    id: 6,
                    titleKey: "computer",
                    descKey: "computerDesc",
                    link: "/computer-protection",
                    locked: true
                }
            ]
        },
        {
            id: 4,
            titleKey: "chapter4",
            subtitleKey: "chapter4Sub",
            levels: [
                {
                    id: 7,
                    titleKey: "browsing",
                    descKey: "browsingDesc",
                    link: "/safe-online-search",
                    locked: true
                },
                {
                    id: 8,
                    titleKey: "network",
                    descKey: "networkDesc",
                    link: "#",
                    locked: true
                }
            ]
        },
        {
            id: 5,
            titleKey: "chapter5",
            subtitleKey: "chapter5Sub",
            levels: [
                {
                    id: 9,
                    titleKey: "data",
                    descKey: "dataDesc",
                    link: "/data-protection",
                    locked: true
                },
                {
                    id: 10,
                    titleKey: "master",
                    descKey: "masterDesc",
                    link: "/data-master",
                    locked: true
                }
            ]
        }
    ];

    const isLevelLocked = (levelId) => {
        if (isLoading) return true;
        if (!user) return true;

        // First level is always unlocked
        if (levelId === 1) return false;

        // Check if the previous level is completed
        const previousLevelId = levelId - 1;
        return !userProgress.completedLevels?.includes(previousLevelId);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <p>{translations[language].loadingText || "Loading game chapters..."}</p>
            </div>
        );
    }

    return (
        <section className="game-chapters" id="game-chapters">
            <div className="container">
                <div className="section-title">
                    <h2>{translations[language].chaptersTitle}</h2>
                    {user && (
                        <p>
                            {translations[language].currentLevel.replace('{level}', userProgress.currentLevel)}
                        </p>
                    )}
                </div>
                <div className="chapters-container">
                    {chapters.map((chapter) => (
                        <div className="chapter-card" key={chapter.id}>
                            <div className="chapter-header">
                                <h3>{translations[language][chapter.titleKey]}</h3>
                                <p>{translations[language][chapter.subtitleKey]}</p>
                            </div>
                            <div className="chapter-content">
                                {chapter.levels.map((level) => {
                                    const locked = isLevelLocked(level.id);
                                    return (
                                        <div
                                            key={level.id}
                                            className={`level-item ${locked ? 'locked' : ''}`}
                                        >
                                            {locked ? (
                                                <div className="locked-content">
                                                    <div className="level-icon">{level.id}</div>
                                                    <div className="level-info">
                                                        <h4>{translations[language][level.titleKey]}</h4>
                                                        <p>{translations[language][level.descKey]}</p>
                                                    </div>
                                                    <div className="lock-icon">🔒</div>
                                                </div>
                                            ) : (
                                                <Link to={level.link} className="unlocked-link">
                                                    <div className="level-icon">{level.id}</div>
                                                    <div className="level-info">
                                                        <h4>{translations[language][level.titleKey]}</h4>
                                                        <p>{translations[language][level.descKey]}</p>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GameChapters;