import React, { useEffect, useState} from "react";
import Phaser from "phaser";
import '../../assets/styles/games/password-master.css'
import {useNavigate} from "react-router-dom";
import Quiz from "../Quiz.jsx";
import {useLanguage} from "../../LanguageContext.jsx";

const GameInstructions = ({ t, onClose }) => {
    return (
        <div className="instructions-modal">
            <div className="instructions-content">
                <h2>{t.howToPlay}</h2>

                <div className="instruction-section">
                    <h3>{t.objectiveTitle}</h3>
                    <p>{t.objective}</p>
                </div>

                <div className="instruction-section">
                    <h3>{t.controlsTitle}</h3>
                    <p>{t.controls}</p>
                </div>

                <div className="instruction-section">
                    <h3>{t.passwordRulesTitle}</h3>
                    <ul className="rules-list">
                        <li>{t.rule1}</li>
                        <li>{t.rule2}</li>
                        <li>{t.rule3}</li>
                        <li>{t.rule4}</li>
                        <li>{t.rule5}</li>
                    </ul>
                </div>

                <div className="instruction-section">
                    <h3>{t.scoringTitle}</h3>
                    <ul className="rules-list">
                        <li>{t.scoring1}</li>
                        <li>{t.scoring2}</li>
                        <li>{t.scoring3}</li>
                    </ul>
                </div>

                <p className="game-tip">{t.tip}</p>

                <button onClick={onClose} className="cyber-button">
                    {t.startButton}
                </button>
            </div>
        </div>
    );
};


const PasswordMaster = ({ level = 1 }) => {
    const [passwords, setPasswords] = useState({});
    const [currentPC, setCurrentPC] = useState(null);
    const [passwordInput, setPasswordInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [hasCompletedLevel, setHasCompletedLevel] = useState(false);
    const [score, setScore] = useState(0);
    const [strengthFeedback, setStrengthFeedback] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [showQuiz, setShowQuiz] = useState(false);
    let attacker;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showInstructions, setShowInstructions] = useState(true);

    // Get language context
    const { translations, language } = useLanguage();
    const t = translations[language].passwordMaster

    useEffect(() => {
        if (!token) {
            setError(language === 'kurdish' ? 'تۆکنی چوونەژوورەوە نییە' : 'No login token found');
            navigate('/');
            alert("you need login to access the route")
        }
    }, [token, navigate, language]);

    // Number of PCs based on level
    const getPCsCount = () => {
        switch(level) {
            case 1: return 3;
            case 2: return 5;
            case 3: return 7;
            default: return 3;
        }
    };

    const saveProgress = async () => {
        try {
            // First save the score
            await fetch('http://localhost:5000/api/auth/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    level,
                    score
                })
            });

            // Then mark level as completed
            await fetch(`http://localhost:5000/api/auth/progress/${level}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    useEffect(() => {
        if (hasCompletedLevel) {
            saveProgress();
            setShowModal(true);
        }
    }, [hasCompletedLevel]);

    useEffect(() => {
        const pcsCount = getPCsCount();
        const gameConfig = {
            type: Phaser.AUTO,
            parent:'game-container',
            width: 800,
            height: 600,
            physics: { default: "arcade", arcade: { gravity: { y: 0 } } },
            scene: {
                preload: function () {
                    this.load.image("player", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s");
                    this.load.image("pc", "https://cdn-icons-png.flaticon.com/512/4703/4703650.png");
                    this.load.image("attacker", "https://cdn-icons-png.flaticon.com/512/6019/6019117.png");
                    this.load.image("background", "https://pub-static.fotor.com/assets/bg/ca5fa97f-7696-414b-bc87-9b5205b27575.jpg");
                },
                create: function () {
                    this.add.image(400, 300, "background").setDisplaySize(800, 600);

                    const graphics = this.add.graphics();
                    graphics.lineStyle(1, 0x00ff00, 0.3);
                    for (let x = 0; x < 800; x += 50) {
                        graphics.lineBetween(x, 0, x, 600);
                    }
                    for (let y = 0; y < 600; y += 50) {
                        graphics.lineBetween(0, y, 800, y);
                    }

                    const player = this.physics.add.sprite(400, 500, "player");
                    player.setCollideWorldBounds(true);
                    player.setScale(0.3);
                    player.setDepth(1);

                    // Create PCs based on level
                    const pcs = [];
                    const pcSpacing = 800 / (pcsCount + 1);
                    for (let i = 1; i <= pcsCount; i++) {
                        pcs.push(
                            this.physics.add.sprite(pcSpacing * i, 200, "pc").setScale(0.5)
                        );
                    }

                    attacker = this.physics.add.sprite(400, 50, "attacker");
                    attacker.setCollideWorldBounds(true);
                    attacker.setScale(0.1);
                    attacker.setDepth(1);

                    const cursors = this.input.keyboard.createCursorKeys();

                    this.physics.add.overlap(
                        player,
                        pcs,
                        (player, pc) => {
                            const index = pcs.indexOf(pc);
                            setCurrentPC(`PC-${index + 1}`);
                        },
                        null,
                        this
                    );

                    this.time.addEvent({
                        delay: 3000,
                        loop: true,
                        callback: () => {
                            const pcsWithWeakPasswords = Object.entries(passwords).filter(
                                ([_, password]) => password.strength === t.weak
                            );

                            if (pcsWithWeakPasswords.length > 0) {
                                const randomPC = pcs[Math.floor(Math.random() * pcsWithWeakPasswords.length)];
                                this.tweens.add({
                                    targets: attacker,
                                    x: randomPC.x,
                                    y: randomPC.y,
                                    duration: 1500,
                                    onComplete: () => {
                                        alert(t.hackerAttack.replace('{pc}', pcsWithWeakPasswords[0][0]).replace('{strength}', t.weak));
                                        setScore(prev => prev - 10); // Deduct points for hacked PC
                                    },
                                });
                            } else if (Object.keys(passwords).length === pcs.length && !hasCompletedLevel) {
                                setHasCompletedLevel(true);
                                setScore(prev => prev + 100); // Add bonus for completing level
                            }
                        },
                    });

                    this.events.on("update", () => {
                        if (cursors.left.isDown) player.setVelocityX(-160);
                        else if (cursors.right.isDown) player.setVelocityX(160);
                        else player.setVelocityX(0);

                        if (cursors.up.isDown) player.setVelocityY(-160);
                        else if (cursors.down.isDown) player.setVelocityY(160);
                        else player.setVelocityY(0);
                    });
                },
            },
        };

        const game = new Phaser.Game(gameConfig);
        return () => game.destroy(true);
    }, [passwords, hasCompletedLevel, level, t]);

    const getPasswordStrengthWithColor = (password) => {
        if (!password) return { strength: t.weak, color: '#ff4d4d' };

        const hasCapital = /[A-Z]/.test(password);
        const hasSmall = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);

        const fulfilledConditions = [hasCapital, hasSmall, hasNumber, hasSymbol].filter(Boolean).length;

        if (fulfilledConditions === 4 && password.length >= 8) {
            return { strength: t.strong, color: '#00cc66' };
        } else if (fulfilledConditions >= 2 && password.length >= 6) {
            return { strength: t.medium, color: '#ffcc00' };
        } else {
            return { strength: t.weak, color: '#ff4d4d' };
        }
    };

    const handleSetPassword = () => {
        if (currentPC) {
            const { strength, color } = getPasswordStrengthWithColor(passwordInput);
            const passwordData = {
                value: passwordInput,
                strength,
                color
            };

            setPasswords({ ...passwords, [currentPC]: passwordData });
            setPasswordInput("");
            setCurrentPC(null);
            setStrengthFeedback({ strength, color });

            // Check if password meets all requirements (capital, small, number, symbol)
            const hasAllRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(passwordInput);

            // Simulate hacker attack if password is not strong (green)
            if (color !== '#00cc66' || !hasAllRequirements) {
                const hackerAttack = Math.random() > 0.5; // 50% chance
                if (hackerAttack) {
                    setScore(prev => prev - 10);
                    alert(t.hackerAttack.replace('{pc}', currentPC).replace('{strength}', strength));
                }
            } else {
                // Award points only for strong passwords that meet all requirements
                setScore(prev => prev + 15);
                alert(t.strongPasswordSet);
            }
        }
    };

    return (
        <div className="game-container" dir={language === 'kurdish' ? 'rtl' : 'ltr'}>
            {showInstructions && (
                <GameInstructions
                    t={t}
                    onClose={() => setShowInstructions(false)}
                />
            )}

            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => window.location.reload()}>
                        {language === 'kurdish' ? 'هەوڵبدەرەوە' : 'Try again'}
                    </button>
                </div>
            )}
            <div className="cyber-header">
                <h1 className="cyber-title">{t.title} - {t.level} {level}</h1>
                <div className="score-display">{t.score} <span>{score}</span></div>
            </div>

            <div id="game-container" className="phaser-container"></div>

            {currentPC && (
                <div className="password-dialog">
                    <div className="dialog-content">
                        <h3>{t.protect} {currentPC}</h3>
                        <input
                            type="text"
                            value={passwordInput}
                            onChange={(e) => {
                                setPasswordInput(e.target.value);
                                setStrengthFeedback(getPasswordStrengthWithColor(e.target.value));
                            }}
                            placeholder={t.enterPassword}
                            className="cyber-input"
                        />
                        {strengthFeedback && (
                            <div className="strength-indicator">
                                <span>{t.strength}</span>
                                <span style={{ color: strengthFeedback.color }}>
                                    {strengthFeedback.strength}
                                </span>
                            </div>
                        )}
                        <button
                            onClick={handleSetPassword}
                            className="cyber-button"
                        >
                            {t.encrypt}
                        </button>
                    </div>
                </div>
            )}

            <div className="password-list">
                <h3 className="list-title">{t.securityStatus}</h3>
                <ul>
                    {Object.entries(passwords).map(([pc, password]) => (
                        <li key={pc} className="password-item">
                            <span className="pc-name">{pc}</span>
                            <span className="password-strength" style={{ color: password.color }}>
                                {password.strength}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    {showQuiz ? (
                        <Quiz
                            level={level}
                            gameScore={score}
                            onComplete={() => {
                                setShowModal(false);
                                setShowQuiz(false);
                                setPasswords({});
                                setHasCompletedLevel(false);
                                navigate("/social-media");
                            }}
                        />
                    ) : (
                        <div className="cyber-modal">
                            <div className="modal-content">
                                <h2 className="mission-accomp">{t.missionAccomplished}</h2>
                                <p className="success-message">{t.allSecure}</p>
                                <p className="final-score">{t.finalScore} {score}</p>
                                <button
                                    onClick={() => {
                                        setShowQuiz(true);
                                    }}
                                    className="cyber-button"
                                >
                                    {t.startTest}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PasswordMaster;