import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const PhishingChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [currentEmail, setCurrentEmail] = useState(0);
    const [userChoices, setUserChoices] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const emails = [
        {
            id: 1,
            subject: language === 'kurdish' ? "هەژمارەکەت بە مەترسییە!" : "Your account is at risk!",
            from: language === 'kurdish'
                ? "پشتگیرانی بانک <support@bank-kurd.com>"
                : "Bank Support <support@bank-kurd.com>",
            content: language === 'kurdish'
                ? "هەژمارەکەت بە مەترسییە! تکایە کلیک لەسەر لینکەکە بکە بۆ پاراستنی هەژمارەکەت: http://bank-kurd-secure.com/login"
                : "Your account is at risk! Please click the link to secure your account: http://bank-kurd-secure.com/login",
            isPhishing: true,
            clues: language === 'kurdish'
                ? [
                    "ناونیشانی ئیمەیڵەکە نایاساییە (bank-kurd.com لە جیاتی bankkurd.com)",
                    "لینکەکە ناوەڕۆکی جیاوازی هەیە لەگەڵ ماڵپەڕی فەرمی",
                    "فوریەتی دروستکراو بۆ ئەوەی فشار لەسەر تۆ بکات"
                ]
                : [
                    "Email address is suspicious (bank-kurd.com instead of bankkurd.com)",
                    "The link has different content than the official website",
                    "Created urgency to pressure you"
                ]
        },
        {
            id: 2,
            subject: language === 'kurdish' ? "داواکاری گۆڕانی وشەی نهێنی" : "Password change request",
            from: "Microsoft Team <no-reply@microsoft.com>",
            content: language === 'kurdish'
                ? "ئێمە تێبینی گۆڕانی وشەی نهێنی هەژمارەکەتمان کردووە. ئەگەر تۆ نەتبێتەوە، تکایە کلیک لەسەر لینکەکە بکە بۆ پاراستنی هەژمارەکەت: https://account.live.com/password/reset"
                : "We noticed a password change request for your account. If this wasn't you, please click the link to secure your account: https://account.live.com/password/reset",
            isPhishing: false,
            clues: language === 'kurdish'
                ? [
                    "ناونیشانی ئیمەیڵەکە فەرمییە",
                    "لینکەکە ڕاستەوخۆ دەبات بەرەو دۆمەینی فەرمی مایکرۆسۆفت",
                    "هیچ فوریەتێکی دروستکراو نییە"
                ]
                : [
                    "Email address is official",
                    "Link goes directly to Microsoft's official domain",
                    "No artificial urgency"
                ]
        },
        {
            id: 3,
            subject: language === 'kurdish' ? "ئیمەیڵی نوێ بۆت هەیە لە LinkedIn" : "You have new messages on LinkedIn",
            from: "LinkedIn Notifications <notifications@linkedin.com>",
            content: language === 'kurdish'
                ? "سەلامەت بێت! تۆ ٣ ئیمەیڵی نوێت هەیە لە LinkedIn. کلیک لەسەر لینکەکە بکە بۆ بینینیان: http://linkd-in-profile-update.com/messages"
                : "Hello! You have 3 new messages on LinkedIn. Click the link to view them: http://linkd-in-profile-update.com/messages",
            isPhishing: true,
            clues: language === 'kurdish'
                ? [
                    "لینکەکە دۆمەینی هەڵە بەکارهێناوە (linkd-in لە جیاتی linkedin)",
                    "ئیمەیڵەکە ڕێنمایی نادەات کە چۆن بچیتە سەر ماڵپەڕی فەرمی",
                    "هیچ زانیاریەکی تایبەت نییە لە ناوەڕۆکیدا"
                ]
                : [
                    "The link uses a fake domain (linkd-in instead of linkedin)",
                    "Email doesn't guide you to the official website",
                    "No specific details in the content"
                ]
        }
    ];

    const handleUserChoice = (isPhishing) => {
        const newChoices = [...userChoices, {
            emailId: emails[currentEmail].id,
            userAnswer: isPhishing,
            correct: isPhishing === emails[currentEmail].isPhishing
        }];

        setUserChoices(newChoices);

        if (currentEmail < emails.length - 1) {
            setCurrentEmail(currentEmail + 1);
        } else {
            setShowResult(true);
            const score = calculateScore(newChoices);
            setTimeout(() => completeChallenge(score), 3000);
        }
    };

    const calculateScore = (choices) => {
        const correctCount = choices.filter(choice => choice.correct).length;
        return Math.floor((correctCount / emails.length) * 50); // Max 50 points
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: ناسینەوەی ئیمەیڵی فیشینگ' : 'Activity 2: Identifying Phishing Emails'}</h3>
            <div className="step-indicator">
                {language === 'kurdish' ? `ئیمەیڵ ${currentEmail + 1} لە ${emails.length}` : `Email ${currentEmail + 1} of ${emails.length}`}
            </div>

            {!showResult ? (
                <>
                    <div className="email-preview">
                        <div className="email-header">
                            <h4>{language === 'kurdish' ? 'سەردێڕ:' : 'Subject:'} {emails[currentEmail].subject}</h4>
                            <p>{language === 'kurdish' ? 'لە:' : 'From:'} {emails[currentEmail].from}</p>
                        </div>
                        <div className="email-content">
                            <p>{emails[currentEmail].content}</p>
                        </div>
                    </div>

                    <div className="phishing-question">
                        <p>{language === 'kurdish' ? 'ئایا ئەم ئیمەیڵە فیشینگە (هەڵەدزی)?' : 'Is this email a phishing attempt?'}</p>
                        <div className="phishing-options">
                            <button
                                className="btn-danger"
                                onClick={() => handleUserChoice(true)}
                            >
                                {language === 'kurdish' ? 'بەڵێ، فیشینگە' : 'Yes, it\'s phishing'}
                            </button>
                            <button
                                className="btn-success"
                                onClick={() => handleUserChoice(false)}
                            >
                                {language === 'kurdish' ? 'نەخێر، فەرمییە' : 'No, it\'s legitimate'}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="feedback-container">
                    <h4>{language === 'kurdish' ? 'ئەنجامەکان' : 'Results'}</h4>
                    <div className={`feedback ${calculateScore(userChoices) >= 30 ? 'correct' : 'incorrect'}`}>
                        {calculateScore(userChoices) >= 30 ? (
                            <>
                                <i className="fas fa-check-circle"></i>
                                <p>
                                    {language === 'kurdish'
                                        ? 'زۆر باش! تۆ بە سەرکەوتوویی ئیمەیڵی فیشینگت ناسیەوە.'
                                        : 'Great job! You successfully identified phishing emails.'}
                                </p>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-times-circle"></i>
                                <p>
                                    {language === 'kurdish'
                                        ? 'هەندێک هەڵەت کردووە. پێویستە وریاتر بیت لە کاتی خوێندنەوەی ئیمەیڵەکان.'
                                        : 'You made some mistakes. You need to be more careful when reading emails.'}
                                </p>
                            </>
                        )}
                        <p>
                            {language === 'kurdish' ? 'کۆی خاڵەکان:' : 'Total score:'} {calculateScore(userChoices)} {language === 'kurdish' ? 'لە ٥٠' : 'out of 50'}
                        </p>
                    </div>

                    <div className="email-review">
                        {emails.map((email, index) => {
                            const userChoice = userChoices.find(c => c.emailId === email.id);
                            return (
                                <div key={email.id} className={`email-review-item ${userChoice?.correct ? 'correct' : 'incorrect'}`}>
                                    <h5>
                                        {language === 'kurdish' ? 'ئیمەیڵ #' : 'Email #'}{index + 1}: {email.subject}
                                    </h5>
                                    <p>
                                        {language === 'kurdish' ? 'تۆ وەڵامت دابوو:' : 'Your answer:'} {userChoice?.userAnswer ?
                                        (language === 'kurdish' ? 'فیشینگ' : 'Phishing') :
                                        (language === 'kurdish' ? 'فەرمی' : 'Legitimate')}
                                    </p>
                                    <p>
                                        {language === 'kurdish' ? 'وەڵامی ڕاست:' : 'Correct answer:'} {email.isPhishing ?
                                        (language === 'kurdish' ? 'فیشینگ' : 'Phishing') :
                                        (language === 'kurdish' ? 'فەرمی' : 'Legitimate')}
                                    </p>
                                    <div className="clues">
                                        <p>{language === 'kurdish' ? 'نیشانەکانی فیشینگ:' : 'Phishing clues:'}</p>
                                        <ul>
                                            {email.clues.map((clue, i) => (
                                                <li key={i}>{clue}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhishingChallenge;