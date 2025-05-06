import React, { useState } from 'react';
import {useLanguage} from "../../../../LanguageContext.jsx";
const Challenge2 = ({ updateScore, goToNextChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false
    });
    const [showTips, setShowTips] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);

    const handleOptionChange = (option) => {
        setOptions(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    const checkPhishingAnswers = () => {
        const isCorrect = options.option1 &&
            options.option2 &&
            options.option3 &&
            options.option4 &&
            !options.option5;

        setQuizSubmitted(true);

        if (isCorrect) {
            setModalContent({
                title: language === 'kurdish' ? 'باش کرا!' : 'Well done!',
                icon: 'check-circle',
                message: language === 'kurdish'
                    ? 'تۆ بە دروستی نیشانەکانی فیشینگت ناسیەوە.'
                    : 'You correctly identified the phishing signs.',
                details: language === 'kurdish' ? [
                    'ناونیشانی ئیمەیڵی نێرەر جیاوازە لە فەرمی',
                    'زمانی بەپەلە و هەڕەشەئامێز بەکارهێنراوە',
                    'لینکەکە ڕاستەوخۆ بەرەو وێبسایتی فەرمی ناچێت',
                    'ئیمەیڵەکە داوای زانیاری کەسی دەکات'
                ] : [
                    'Sender email address differs from official',
                    'Urgent and threatening language used',
                    'Link doesn\'t go to official website',
                    'Email asks for personal information'
                ],
                buttonText: language === 'kurdish' ? 'چالاکی سێیەم' : 'Next Challenge',
                isSuccess: true
            });
            updateScore(15);
        } else {
            const incorrectOptions = [];
            if (!options.option1) incorrectOptions.push(language === 'kurdish'
                ? 'ناونیشانی ئیمەیڵی نێرەر جیاوازە لە فەرمی'
                : 'Sender email address differs from official');
            if (!options.option2) incorrectOptions.push(language === 'kurdish'
                ? 'زمانی بەپەلە و هەڕەشەئامێز بەکارهێنراوە'
                : 'Urgent and threatening language used');
            if (!options.option3) incorrectOptions.push(language === 'kurdish'
                ? 'لینکەکە ڕاستەوخۆ بەرەو وێبسایتی فەرمی ناچێت'
                : 'Link doesn\'t go to official website');
            if (!options.option4) incorrectOptions.push(language === 'kurdish'
                ? 'ئیمەیڵەکە داوای زانیاری کەسی دەکات'
                : 'Email asks for personal information');
            if (options.option5) incorrectOptions.push(language === 'kurdish'
                ? 'هەڵەی ڕێزمانی و نووسین نابێت بەتەنیا نیشانەی فیشینگ بن'
                : 'Grammar/spelling errors alone don\'t indicate phishing');

            setModalContent({
                title: language === 'kurdish' ? 'پێویستە باشتر بکرێت' : 'Needs improvement',
                icon: 'times-circle',
                message: language === 'kurdish'
                    ? 'ئەم خاڵانە پێویستیان بە چاکسازی هەیە:'
                    : 'These points need correction:',
                details: incorrectOptions,
                buttonText: language === 'kurdish' ? 'هەوڵدانەوە' : 'Try Again',
                isSuccess: false
            });
        }
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (modalContent.isSuccess) {
            goToNextChallenge(3);
        }
    };

    const showPhishingTips = () => {
        setModalContent({
            title: language === 'kurdish' ? 'ئامۆژگاری پاراستن لە فیشینگ' : 'Phishing Protection Tips',
            icon: 'lightbulb',
            message: language === 'kurdish'
                ? 'چۆن ئیمەیڵی فیشینگ بناسینەوە:'
                : 'How to identify phishing emails:',
            details: language === 'kurdish' ? [
                'ناونیشانی ئیمەیڵی نێرەر بپشکنە (کۆمپانیا گەورەکان ناونیشانی فەرمیان هەیە)',
                'ئاگاداری زمانی بەپەلە و هەڕەشەئامێز بە',
                'پێش کلیک کردن لەسەر هەر لینکێک، ناونیشانەکە بپشکنە',
                'گومان لە هەر ئیمەیڵێک بکە کە داوای زانیاری کەسی دەکات',
                'هەڵەی ڕێزمانی و نووسین دەتوانن ئاماژە بن'
            ] : [
                'Check sender email address (big companies have official domains)',
                'Be wary of urgent and threatening language',
                'Hover over links before clicking to check destination',
                'Be suspicious of emails asking for personal info',
                'Grammar/spelling errors can be indicators'
            ],
            buttonText: language === 'kurdish' ? 'تێگەیشتم' : 'Got it',
            isSuccess: false
        });
        setShowModal(true);
    };

    return (
        <div className="challenge-container" id="challenge2">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: پاراستن لە هێرشەکانی فیشینگ' : 'Challenge 2: Protecting Against Phishing Attacks'}</h3>
            <p className="challenge-intro">
                {language === 'kurdish'
                    ? 'سارا ئیمەیڵێکی گومانلێکراوی پێگەیشتووە کە داوای دەکات هەژماری ئینستاگرامەکەی تازە بکاتەوە. ئایا دەزانیت چۆن یارمەتی بدەیت بزانێت ئایا ئەمە فیشینگە؟'
                    : 'Sara received a suspicious email asking her to reset her Instagram account. Do you know how to help her identify if this is phishing?'}
            </p>

            <div className="email-preview">
                <div className="email-header">
                    <div className="email-from">
                        <span className="email-from-title">{language === 'kurdish' ? 'لە:' : 'From:'}</span>
                        <span className="email-from-address">instagram-security@insta-team.com</span>
                    </div>
                    <div className="email-subject">
                        <span className="email-subject-title">{language === 'kurdish' ? 'بابەت:' : 'Subject:'}</span>
                        <span className="email-subject-text">
                            {language === 'kurdish'
                                ? 'هۆشداری گرنگ: هەژمارەکەت لە مەترسیدایە'
                                : 'Important Warning: Your Account is at Risk'}
                        </span>
                    </div>
                </div>
                <div className="email-body">
                    <div className="email-logo">
                        <img src="/api/placeholder/100/100" alt="Instagram Logo"/>
                    </div>
                    <div className="email-content">
                        <h3>{language === 'kurdish' ? 'هۆشداری پاراستنی هەژمار' : 'Account Security Warning'}</h3>
                        <p>{language === 'kurdish' ? 'بەڕێز بەکارهێنەر،' : 'Dear user,'}</p>
                        <p>
                            {language === 'kurdish'
                                ? 'ئێمە هەندێک چالاکی نائاسایمان بینیوە لە هەژماری Instagram ەکەت. بۆ پاراستنی هەژمارەکەت، پێویستە وشەی نهێنیت بگۆڕیت و هەژمارەکەت بپشکنیت.'
                                : 'We noticed some unusual activity on your Instagram account. To protect your account, you need to reset your password and verify your account.'}
                        </p>
                        <p>
                            {language === 'kurdish'
                                ? 'تکایە کلیک لەسەر ئەم لینکە بکە و پەیڕەوی ڕێنماییەکان بکە:'
                                : 'Please click this link and follow the instructions:'}
                        </p>
                        <a href="#" className="email-button">
                            {language === 'kurdish' ? 'پشکنینی ئێستای هەژمار' : 'Verify Account Now'}
                        </a>
                        <p>
                            {language === 'kurdish'
                                ? 'ئەگەر لە ماوەی ٢٤ کاتژمێردا ئەم کارە نەکەیت، هەژمارەکەت بەشێوەیەکی کاتی ڕادەگیرێت.'
                                : 'If you don\'t complete this within 24 hours, your account will be temporarily suspended.'}
                        </p>
                        <p>
                            {language === 'kurdish'
                                ? 'سوپاس بۆ هاوکاریت،<br/>تیمی پاراستنی Instagram'
                                : 'Thank you for your cooperation,<br/>Instagram Security Team'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="quiz-container" id="phishingQuiz">
                <div className="quiz-question">
                    {language === 'kurdish'
                        ? 'هەڵسەنگاندنی ئیمەیڵەکە: کام لەم نیشانانە ئاماژەن کە ئەم ئیمەیڵە فیشینگە؟ (هەموو وەڵامە دروستەکان دیاری بکە)'
                        : 'Evaluate the email: Which of these signs indicate this is phishing? (Select all correct answers)'}
                </div>
                <div className="quiz-options">
                    {[
                        {
                            id: 'option1',
                            label: language === 'kurdish'
                                ? 'ناونیشانی ئیمەیڵی نێرەر (instagram-security@insta-team.com) جیاوازە لە ناونیشانی فەرمی'
                                : 'Sender email (instagram-security@insta-team.com) differs from official address'
                        },
                        {
                            id: 'option2',
                            label: language === 'kurdish'
                                ? 'زمانی بەپەلە و هەڕەشەئامێز بەکارهێنراوە بۆ هاندانی کردارێکی خێرا'
                                : 'Urgent/threatening language used to prompt quick action'
                        },
                        {
                            id: 'option3',
                            label: language === 'kurdish'
                                ? 'لینکەکە ڕاستەوخۆ بەرەو وێبسایتی فەرمی Instagram ناچێت'
                                : 'Link doesn\'t go to official Instagram website'
                        },
                        {
                            id: 'option4',
                            label: language === 'kurdish'
                                ? 'ئیمەیڵەکە داوای زانیاری کەسی دەکات'
                                : 'Email asks for personal information'
                        },
                        {
                            id: 'option5',
                            label: language === 'kurdish'
                                ? 'ئیمەیڵەکە هەڵەی ڕێزمانی و نووسین تێدایە'
                                : 'Email contains grammar/spelling errors'
                        }
                    ].map((option) => (
                        <div className="quiz-option" key={option.id}>
                            <input
                                type="checkbox"
                                id={option.id}
                                name="phishingSigns"
                                checked={options[option.id]}
                                onChange={() => handleOptionChange(option.id)}
                                disabled={quizSubmitted && modalContent.isSuccess}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn btn-secondary" onClick={showPhishingTips}>
                    <i className="fas fa-question-circle"></i> {language === 'kurdish' ? 'ئامۆژگاری' : 'Tips'}
                </button>
                <button
                    className={`btn btn-check ${quizSubmitted ? 'submitted' : ''}`}
                    onClick={checkPhishingAnswers}
                >
                    {quizSubmitted ? (
                        <><i className="fas fa-check"></i> {language === 'kurdish' ? 'پشکنینی دووبارە' : 'Check Again'}</>
                    ) : (
                        <><i className="fas fa-shield-alt"></i> {language === 'kurdish' ? 'پشکنینی وەڵامەکان' : 'Check Answers'}</>
                    )}
                </button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className={`modal-header ${modalContent.isSuccess ? 'success' : 'warning'}`}>
                            <i className={`fas fa-${modalContent.icon}`}></i>
                            <h3>{modalContent.title}</h3>
                        </div>
                        <div className="modal-body">
                            <p>{modalContent.message}</p>
                            {modalContent.details && modalContent.details.length > 0 && (
                                <ul className="modal-details">
                                    {modalContent.details.map((item, index) => (
                                        <li key={index}>
                                            <i className={`fas fa-${modalContent.isSuccess ? 'check' : 'exclamation'}-circle`}></i>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                className={`btn ${modalContent.isSuccess ? 'btn-success' : 'btn-primary'}`}
                                onClick={handleModalClose}
                            >
                                {modalContent.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Challenge2;