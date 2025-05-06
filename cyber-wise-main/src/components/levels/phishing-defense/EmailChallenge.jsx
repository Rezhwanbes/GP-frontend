import React, {useState} from "react";
import {useLanguage} from "../../../LanguageContext.jsx";
const EmailChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const options = [
        {
            id: 1,
            text: language === 'kurdish'
                ? 'ناونیشانی ئیمەیڵی نێرەر جیاوازە لە فەرمی'
                : 'Sender email address differs from official',
            correct: true
        },
        {
            id: 2,
            text: language === 'kurdish'
                ? 'زمانی بەپەلە و هەڕەشەئامێز'
                : 'Urgent and threatening language',
            correct: true
        },
        {
            id: 3,
            text: language === 'kurdish'
                ? 'لینکی نەناسراو لەناو ئیمەیڵەکە'
                : 'Unfamiliar link in the email',
            correct: true
        },
        {
            id: 4,
            text: language === 'kurdish'
                ? 'هەڵەی ڕێزمانی کەم'
                : 'Few grammatical errors',
            correct: false
        },
        {
            id: 5,
            text: language === 'kurdish'
                ? 'داوای زانیاری کەسی'
                : 'Request for personal information',
            correct: true
        },
        {
            id: 6,
            text: language === 'kurdish'
                ? 'لۆگۆی کۆمپانیایەکی دیاریکراو'
                : 'Official company logo',
            correct: false
        }
    ];

    const toggleOption = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(optionId => optionId !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const checkAnswers = () => {
        const correctSelected = selectedOptions.every(id =>
            options.find(opt => opt.id === id)?.correct);
        const allCorrectSelected = options
            .filter(opt => opt.correct)
            .every(opt => selectedOptions.includes(opt.id));

        const fullyCorrect = correctSelected && allCorrectSelected;
        setIsCorrect(fullyCorrect);
        setShowFeedback(true);

        if (fullyCorrect) {
            setTimeout(() => completeChallenge(30), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ١: ناسینەوەی ئیمەیڵی فیشینگ' : 'Activity 1: Identify Phishing Email'}</h3>
            <div className="email-example">
                <div className="email-header">
                    <p><strong>{language === 'kurdish' ? 'لە:' : 'From:'}</strong> support@facebookmail.com</p>
                    <p><strong>{language === 'kurdish' ? 'بابەت:' : 'Subject:'}</strong>
                        {language === 'kurdish' ? ' پێویستە هەژمارەکەت نوێ بکەیتەوە!' : ' You need to update your account!'}
                    </p>
                </div>
                <div className="email-body">
                    <p>{language === 'kurdish' ? 'سڵاو،' : 'Hello,'}</p>
                    <p>
                        {language === 'kurdish'
                            ? 'ئێمە هەوڵێکی نەناسراومان تۆمارکردووە بۆ چوونەژوورەوە لە هەژمارەکەت. بۆ پاراستنی هەژمارەکەت، تکایە کلیک لەسەر ئەم لینکە بکە و وشەی نهێنیەکەت بگۆڕە:'
                            : 'We have detected an unauthorized login attempt on your account. To protect your account, please click this link and change your password:'}
                    </p>
                    <a href="#" className="phishing-link">www.facebook-secure-login.com</a>
                    <p>
                        {language === 'kurdish'
                            ? 'ئەگەر ئەم کارە تۆ نەکردبیت، هەژمارەکەت ڕادەگیرێت.'
                            : 'If you don\'t do this, your account will be suspended.'}
                    </p>
                    <p>
                        {language === 'kurdish'
                            ? 'سوپاس،<br/>تیمی پاراستنی فەیسبووک'
                            : 'Thanks,<br/>Facebook Security Team'}
                    </p>
                </div>
            </div>

            <div className="quiz-question">
                {language === 'kurdish'
                    ? 'کام لەم نیشانانە ئاماژەن کە ئەم ئیمەیڵە فیشینگە؟ (هەمووی دیاری بکە)'
                    : 'Which of these signs indicate this is a phishing email? (Select all)'}
            </div>

            <div className="options-grid">
                {options.map(option => (
                    <div
                        key={option.id}
                        className={`option-card ${selectedOptions.includes(option.id) ? 'selected' : ''}`}
                        onClick={() => toggleOption(option.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(option.id)}
                            readOnly
                        />
                        <label>{option.text}</label>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'باش کرا! تۆ بە سەرکەوتوویی نیشانەکانی ئیمەیڵی فیشینگت ناسیەوە.'
                                    : 'Well done! You successfully identified the signs of a phishing email.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک هەڵەت کردووە. سەرنجی زیاتر بدە بە نیشانەکانی ئیمەیڵی فیشینگ.'
                                    : 'You made some mistakes. Pay more attention to the signs of phishing emails.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default EmailChallenge;