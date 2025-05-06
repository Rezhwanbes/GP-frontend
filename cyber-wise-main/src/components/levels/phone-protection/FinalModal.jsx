import React from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const FinalModal = ({ score, onClose, level }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const getLevelMessage = () => {
        switch(level) {
            case 5:
                return language === 'kurdish'
                    ? "ئێستا مۆبایلەکەت پارێزراوە لە هەڕەشە جیاوازەکان!"
                    : "Your mobile is now protected from various threats!";
            default:
                return language === 'kurdish'
                    ? "ئامادەیت بۆ ئاستی داھاتوو!"
                    : "Ready for the next level!";
        }
    };

    const getLevelAchievements = () => {
        switch(level) {
            case 5:
                return language === 'kurdish'
                    ? [
                        "ڕێکخستنە سەرەکییەکانی پاراستنت چالاک کرد",
                        "فێڵی سەمەرەت لە پەیام و ئیمەیڵ ناسیەوە",
                        "مۆڵەتی ئەپەکانت بە ڕێکی بەڕێوەبرد",
                        "پاراستنی تۆڕ و پەیوەندییەکانت فێربوو"
                    ]
                    : [
                        "Activated basic security settings",
                        "Identified phishing in messages and emails",
                        "Managed app permissions properly",
                        "Learned network and connection protection"
                    ];
            default:
                return [];
        }
    };

    return (
        <div className="final-modal-overlay">
            <div className="final-modal">
                <div className="modal-header success">
                    <i className="fas fa-shield-alt"></i>
                    <h3>
                        {language === 'kurdish'
                            ? `پیرۆزە! ئاستی ${level} تەواو کرد`
                            : `Congratulations! Level ${level} Completed`}
                    </h3>
                </div>
                <div className="modal-body">
                    <p>{getLevelMessage()}</p>
                    <div className="score-display">
                        <i className="fas fa-star"></i>
                        <span>
                            {language === 'kurdish'
                                ? 'کۆی گشتی خاڵەکان: '
                                : 'Total score: '}{score}
                        </span>
                    </div>
                    <ul className="achievements">
                        {getLevelAchievements().map((achievement, index) => (
                            <li key={index}><i className="fas fa-check"></i> {achievement}</li>
                        ))}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="btn-success" onClick={onClose}>
                        {language === 'kurdish' ? 'تەواوکردن' : 'Complete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinalModal;