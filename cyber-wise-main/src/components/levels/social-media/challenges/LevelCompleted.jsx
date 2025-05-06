import React from 'react';
import { useNavigate } from "react-router-dom";
import {useLanguage} from "../../../../LanguageContext.jsx";
const LevelCompleted = ({ score }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];
    const navigate = useNavigate();

    return (
        <div className="completion-message" id="levelCompleted">
            <div className="completion-icon">
                <i className="fas fa-award"></i>
            </div>
            <h2>{language === 'kurdish' ? 'پیرۆزە! تۆ ئاستەکەت تەواو کرد' : 'Congratulations! You completed the level'}</h2>
            <p>
                {language === 'kurdish'
                    ? 'تۆ هەموو چالاکیەکانی ئاستی "پاراستنی سۆشیال میدیا" تەواو کرد و ئێستا دەزانیت چۆن هەژمارەکانت بپارێزیت!'
                    : 'You completed all challenges in the "Social Media Protection" level and now know how to protect your accounts!'}
            </p>
            <div className="points-earned">
                <i className="fas fa-star"></i> {score} {language === 'kurdish' ? 'خاڵت بەدەست هێنا' : 'points earned'}
            </div>
            <p>{language === 'kurdish' ? 'لە ئێستادا تۆ دەتوانیت:' : 'Now you can:'}</p>
            <ul className="checklist">
                <li><i className="fas fa-check"></i>
                    {language === 'kurdish'
                        ? 'ڕێکخستنەکانی تایبەتمەندی سۆشیال میدیا بەشێوەیەکی باش ڕێکبخەیت'
                        : 'Properly configure social media privacy settings'}
                </li>
                <li><i className="fas fa-check"></i>
                    {language === 'kurdish'
                        ? 'هێرشەکانی فیشینگ بناسیتەوە'
                        : 'Identify phishing attacks'}
                </li>
                <li><i className="fas fa-check"></i>
                    {language === 'kurdish'
                        ? 'وشەی نهێنی بەهێز دروست بکەیت'
                        : 'Create strong passwords'}
                </li>
            </ul>
            <div className="action-buttons">
                <button onClick={() => navigate("/#game-chapters")} className="btn btn-primary">
                    {language === 'kurdish' ? 'گەڕانەوە بۆ بەشەکانی یاری' : 'Back to Game Chapters'}
                </button>
                <button onClick={() => navigate("/phishing-defense-game")} className="btn btn-next">
                    {language === 'kurdish' ? 'بەشی داهاتوو' : 'Next Chapter'}
                </button>
            </div>
        </div>
    );
};

export default LevelCompleted;