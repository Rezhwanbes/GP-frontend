import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";
const SecuritySetupChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [stepsCompleted, setStepsCompleted] = useState({
        lockScreen: false,
        biometrics: false,
        encryption: false,
        updates: false
    });
    const [showFeedback, setShowFeedback] = useState(false);

    const toggleStep = (step) => {
        setStepsCompleted(prev => ({
            ...prev,
            [step]: !prev[step]
        }));
    };

    const checkSetup = () => {
        setShowFeedback(true);
        const allCompleted = Object.values(stepsCompleted).every(step => step);

        if (allCompleted) {
            setTimeout(() => completeChallenge(30), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ١: ڕێکخستنی پاراستنی سەرەکی' : 'Activity 1: Basic Security Setup'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'هەموو ڕێکخستنە پاراستنە سەرەکییەکان چالاک بکە بۆ پاراستنی مۆبایلەکەت:'
                    : 'Activate all basic security settings to protect your device:'}
            </p>

            <div className="security-steps">
                <div
                    className={`security-step ${stepsCompleted.lockScreen ? 'completed' : ''}`}
                    onClick={() => toggleStep('lockScreen')}
                >
                    <div className="step-icon">
                        {stepsCompleted.lockScreen ? <i className="fas fa-check"></i> : <i className="fas fa-lock"></i>}
                    </div>
                    <div className="step-info">
                        <h4>{language === 'kurdish' ? 'قوفڵی شاشە' : 'Screen Lock'}</h4>
                        <p>{language === 'kurdish' ? 'کۆدی ٦ ژمارەیی یان وشەی نهێنی دانێ' : 'Set a 6-digit code or password'}</p>
                    </div>
                </div>

                <div
                    className={`security-step ${stepsCompleted.biometrics ? 'completed' : ''}`}
                    onClick={() => toggleStep('biometrics')}
                >
                    <div className="step-icon">
                        {stepsCompleted.biometrics ? <i className="fas fa-check"></i> : <i className="fas fa-fingerprint"></i>}
                    </div>
                    <div className="step-info">
                        <h4>{language === 'kurdish' ? 'ناسینەوەی بایۆمەتری' : 'Biometric Authentication'}</h4>
                        <p>{language === 'kurdish' ? 'چالاککردنی ناسینەوەی پەنجە یان دیمۆڕ' : 'Enable fingerprint or face recognition'}</p>
                    </div>
                </div>

                <div
                    className={`security-step ${stepsCompleted.encryption ? 'completed' : ''}`}
                    onClick={() => toggleStep('encryption')}
                >
                    <div className="step-icon">
                        {stepsCompleted.encryption ? <i className="fas fa-check"></i> : <i className="fas fa-key"></i>}
                    </div>
                    <div className="step-info">
                        <h4>{language === 'kurdish' ? 'شێواندن (Encryption)' : 'Encryption'}</h4>
                        <p>{language === 'kurdish' ? 'چالاککردنی شێواندنی زانیارییەکان' : 'Enable data encryption'}</p>
                    </div>
                </div>

                <div
                    className={`security-step ${stepsCompleted.updates ? 'completed' : ''}`}
                    onClick={() => toggleStep('updates')}
                >
                    <div className="step-icon">
                        {stepsCompleted.updates ? <i className="fas fa-check"></i> : <i className="fas fa-sync-alt"></i>}
                    </div>
                    <div className="step-info">
                        <h4>{language === 'kurdish' ? 'نوێکردنەوەی خۆکار' : 'Automatic Updates'}</h4>
                        <p>{language === 'kurdish' ? 'چالاککردنی نوێکردنەوەی خۆکار بۆ سیستەم و ئەپەکان' : 'Enable automatic updates for system and apps'}</p>
                    </div>
                </div>
            </div>

            <button className="check-button" onClick={checkSetup}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className={`feedback ${Object.values(stepsCompleted).every(step => step) ? 'correct' : 'incorrect'}`}>
                    {Object.values(stepsCompleted).every(step => step) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! مۆبایلەکەت ئێستا پارێزراوە بە ڕێکخستنە سەرەکییەکانی پاراستن.'
                                    : 'Great! Your device is now protected with basic security settings.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هێشتا هەندێک ڕێکخستن چالاک نەکراوە. تکایە هەموو خاڵەکان چالاک بکە.'
                                    : 'Some settings are still not activated. Please complete all steps.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SecuritySetupChallenge;