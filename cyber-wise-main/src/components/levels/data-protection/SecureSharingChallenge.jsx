import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const SecureSharingChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const sharingMethods = [
        {
            id: 1,
            method: language === 'kurdish'
                ? "ناردنی ئیمەیڵ بە پەڕگەی چاکسازیکراو"
                : "Sending email with an attachment",
            secure: false,
            reason: language === 'kurdish'
                ? "ئیمەیڵ ناڕێگەلێکراوە و دەکرێت بخرێتە ناو چاودێری"
                : "Email is unencrypted and can be intercepted"
        },
        {
            id: 2,
            method: language === 'kurdish'
                ? "بەکارهێنانی خزمەتگوزاریەکی هاوبەشی پەڕگەی ئینتەرنێتی بە وشەی نهێنی"
                : "Using an online file sharing service with password",
            secure: true,
            reason: language === 'kurdish'
                ? "پەڕگەکە تەنها بە کەسە ڕێگەپێدراوەکان دەبینرێت"
                : "The file is only visible to authorized people"
        },
        {
            id: 3,
            method: language === 'kurdish'
                ? "ناردنی پەیام لە ڕێگەی ئەپێکی نامە ناڕێگەلێکراوەکان"
                : "Sending messages through unencrypted messaging apps",
            secure: false,
            reason: language === 'kurdish'
                ? "ئەپە ناڕێگەلێکراوەکان پاراستنی پێویستیان نییە"
                : "Unencrypted apps don't provide necessary protection"
        },
        {
            id: 4,
            method: language === 'kurdish'
                ? "بەکارهێنانی پلاتفۆرمێکی هاوبەشی سەلامەت بە کۆدی تایبەت"
                : "Using a secure sharing platform with unique code",
            secure: true,
            reason: language === 'kurdish'
                ? "پلاتفۆرمە سەلامەتەکان پاراستنی پێویست دابین دەکەن"
                : "Secure platforms provide necessary protection"
        },
        {
            id: 5,
            method: language === 'kurdish'
                ? "ناردنی پەڕگە لە ڕێگەی USB"
                : "Transferring files via USB",
            secure: false,
            reason: language === 'kurdish'
                ? "پەڕگەکە دەکرێت بگوازرێتەوە بۆ کۆمپیوتەری تر بەبێ چاودێری"
                : "Files can be transferred to other computers without monitoring"
        },
        {
            id: 6,
            method: language === 'kurdish'
                ? "بەکارهێنانی سیستەمی داخستنی پەڕگە بە کلیل"
                : "Using file encryption with a key",
            secure: true,
            reason: language === 'kurdish'
                ? "تەنها کەسەکەی کلیلەکەی هەیە دەتوانێت پەڕگەکە بکاتەوە"
                : "Only the person with the key can open the file"
        }
    ];

    const toggleSelection = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const checkAnswers = () => {
        const allCorrect = sharingMethods.every(method =>
            (method.secure && selectedOptions.includes(method.id)) ||
            (!method.secure && !selectedOptions.includes(method.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            setTimeout(() => completeChallenge(40), 2000);
        } else {
            const correctCount = sharingMethods.filter(method =>
                (method.secure && selectedOptions.includes(method.id)) ||
                (!method.secure && !selectedOptions.includes(method.id))
            ).length;
            const score = Math.floor((correctCount / sharingMethods.length) * 40);
            setTimeout(() => completeChallenge(score), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٤: هاوبەشی سەلامەت' : 'Activity 4: Secure Sharing'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'کامیان لەم ڕێگایانە سەلامەتن بۆ هاوبەشی پەڕگەی حەساس؟ (هەمووی دیاری بکە)'
                    : 'Which of these methods are secure for sharing sensitive files? (Select all)'}
            </p>

            <div className="methods-list">
                {sharingMethods.map(method => (
                    <div
                        key={method.id}
                        className={`method-card ${selectedOptions.includes(method.id) ? 'selected' : ''}`}
                        onClick={() => toggleSelection(method.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(method.id)}
                            readOnly
                        />
                        <div>
                            <label>{method.method}</label>
                            {selectedOptions.includes(method.id) && (
                                <span className="method-reason">{method.reason}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className={`feedback ${
                    sharingMethods.every(method =>
                        (method.secure && selectedOptions.includes(method.id)) ||
                        (!method.secure && !selectedOptions.includes(method.id))
                    ) ? 'correct' : 'partial'
                }`}>
                    {sharingMethods.every(method =>
                        (method.secure && selectedOptions.includes(method.id)) ||
                        (!method.secure && !selectedOptions.includes(method.id))) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە سەرکەوتوویی ڕێگا سەلامەتەکانی هاوبەشی زانیاریت ناسیەوە.'
                                    : 'Excellent! You successfully identified secure information sharing methods.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک هەڵەت کردووە. لەبیرت بێت کە پێویستە زانیاری حەساس بە پاراستنی تەواو هاوبەش بکرێت.'
                                    : 'You made some mistakes. Remember that sensitive information must be shared with complete protection.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SecureSharingChallenge;