import React from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const DataMasterFinalModal = ({ score, onClose }) => {
    const { language } = useLanguage();

    const getRank = () => {
        if (score >= 180) return language === 'kurdish' ? "زانای زانیاری" : "Data Master";
        if (score >= 150) return language === 'kurdish' ? "پیشەگەری ئاسایشی سایبەری" : "Cyber Security Professional";
        if (score >= 120) return language === 'kurdish' ? "پارێزەری زانیاری" : "Data Guardian";
        return language === 'kurdish' ? "فێرخوازی ئاسایشی سایبەری" : "Cyber Security Apprentice";
    };

    return (
        <div className="final-modal-overlay">
            <div className="final-modal">
                <div className="modal-header master">
                    <i className="fas fa-graduation-cap"></i>
                    <h3>{language === 'kurdish' ? "پیرۆزە! ئاستی کۆتایی تەواو کرد" : "Congratulations! You've completed the final level"}</h3>
                </div>
                <div className="modal-body">
                    <p>
                        {language === 'kurdish'
                            ? `تۆ ئێستا بە فەرمی ناسێنەرایەتیت وەک ${getRank()} کرا!`
                            : `You are now officially certified as a ${getRank()}!`}
                    </p>

                    <div className="score-display master">
                        <i className="fas fa-shield-alt"></i>
                        <span>
                            {language === 'kurdish'
                                ? `کۆی گشتی خاڵەکان: ${score} لە ٢٠٠`
                                : `Total score: ${score} out of 200`}
                        </span>
                    </div>

                    <div className="rank-badge">
                        <div className="badge-icon">
                            <i className="fas fa-lock"></i>
                        </div>
                        <div className="badge-text">
                            <h4>{getRank()}</h4>
                            <p>
                                {language === 'kurdish'
                                    ? `ئاستی ئاسایشی سایبەری: ${Math.floor((score / 200) * 100)}%`
                                    : `Cyber Security Level: ${Math.floor((score / 200) * 100)}%`}
                            </p>
                        </div>
                    </div>

                    <ul className="master-skills">
                        <li><i className="fas fa-check"></i>
                            {language === 'kurdish'
                                ? "ناسینەوەی شکاندنی زانیاری"
                                : "Identifying data breaches"}
                        </li>
                        <li><i className="fas fa-check"></i>
                            {language === 'kurdish'
                                ? "پاراستنی زانیاری بە شێوازی نوێنەرایەتی"
                                : "Protecting data with best practices"}
                        </li>
                        <li><i className="fas fa-check"></i>
                            {language === 'kurdish'
                                ? "ئاسایشی API و کۆد نووسین"
                                : "API security and secure coding"}
                        </li>
                        <li><i className="fas fa-check"></i>
                            {language === 'kurdish'
                                ? "زانستێکی گشتی لەسەر پاراستنی زانیاری"
                                : "Comprehensive knowledge of data protection"}
                        </li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button className="btn-master" onClick={onClose}>
                        {language === 'kurdish' ? "کۆتایی هێنان" : "Finish"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataMasterFinalModal;