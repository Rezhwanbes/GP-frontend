import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const UrlAnalysisChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedUrls, setSelectedUrls] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const urlExamples = [
        { id: 1, url: "https://www.bankofkurdistan.com/login", safe: true },
        { id: 2, url: "http://free-gifts.krd/promo?id=12345", safe: false },
        { id: 3, url: "https://www.amazon.com/dp/B08N5KWB9H", safe: true },
        { id: 4, url: "https://secure-payment.net/process?user=123", safe: false },
        { id: 5, url: "https://www.wikipedia.org/wiki/Kurdistan", safe: true },
        { id: 6, url: "http://facebook.update.profile.verify.krd", safe: false }
    ];

    const urlFeatures = [
        {
            id: 1,
            feature: language === 'kurdish'
                ? "پێشگرەی HTTPS لە جیاتی HTTP"
                : "HTTPS prefix instead of HTTP",
            correct: true
        },
        {
            id: 2,
            feature: language === 'kurdish'
                ? "ناونیشانی دروست و ڕێک (نەک چەند خاڵی زۆر)"
                : "Proper and clean address (not many dots)",
            correct: true
        },
        {
            id: 3,
            feature: language === 'kurdish'
                ? "پاشگرەی وڵات (وەک .com .org .net)"
                : "Country suffix (like .com .org .net)",
            correct: true
        },
        {
            id: 4,
            feature: language === 'kurdish'
                ? "لینکی کورتکراوە (وەک bit.ly)"
                : "Shortened link (like bit.ly)",
            correct: false
        },
        {
            id: 5,
            feature: language === 'kurdish'
                ? "پارامیتەری زۆر لە ناونیشاندا"
                : "Many parameters in the address",
            correct: false
        },
        {
            id: 6,
            feature: language === 'kurdish'
                ? "ناوی ناسراو و فەرمی کۆمپانیا"
                : "Known and official company name",
            correct: true
        }
    ];

    const toggleUrlSelection = (id) => {
        if (selectedUrls.includes(id)) {
            setSelectedUrls(selectedUrls.filter(urlId => urlId !== id));
        } else {
            setSelectedUrls([...selectedUrls, id]);
        }
    };

    const checkUrlAnswers = () => {
        const allCorrect = urlExamples.every(example =>
            (example.safe && selectedUrls.includes(example.id)) ||
            (!example.safe && !selectedUrls.includes(example.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            setTimeout(() => setCurrentStep(2), 2000);
        }
    };

    const checkFeatureAnswers = (selectedFeatures) => {
        const correctCount = urlFeatures.filter(feature =>
            feature.correct === selectedFeatures.includes(feature.id)
        ).length;

        const score = Math.floor((correctCount / urlFeatures.length) * 30);
        completeChallenge(score);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ١: شیکردنەوەی ناونیشانی وێب' : 'Activity 1: URL Analysis'}</h3>

            {currentStep === 1 ? (
                <>
                    <p className="instructions">
                        {language === 'kurdish'
                            ? 'کامیان لەم ناونیشانانە سەلامەتن؟ (هەمووی دیاری بکە)'
                            : 'Which of these URLs are safe? (Select all)'}
                    </p>

                    <div className="url-grid">
                        {urlExamples.map(example => (
                            <div
                                key={example.id}
                                className={`url-card ${selectedUrls.includes(example.id) ? 'selected' : ''}`}
                                onClick={() => toggleUrlSelection(example.id)}
                            >
                                <div className="url-text">{example.url}</div>
                                <div className={`url-status ${example.safe ? 'safe' : 'unsafe'}`}>
                                    {selectedUrls.includes(example.id) ? (
                                        example.safe
                                            ? language === 'kurdish' ? 'سەلامەت' : 'Safe'
                                            : language === 'kurdish' ? 'مەترسیدار' : 'Dangerous'
                                    ) : '‌'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="check-button"
                        onClick={checkUrlAnswers}
                        disabled={selectedUrls.length === 0}
                    >
                        {language === 'kurdish' ? 'پشکنین' : 'Check'}
                    </button>

                    {showFeedback && (
                        <div className={`feedback ${urlExamples.every(example =>
                            (example.safe && selectedUrls.includes(example.id)) ||
                            (!example.safe && !selectedUrls.includes(example.id)) ? 'correct' : 'incorrect')}`}
                        >
                            {urlExamples.every(example =>
                                (example.safe && selectedUrls.includes(example.id)) ||
                                (!example.safe && !selectedUrls.includes(example.id)) ? (
                                    <>
                                        <i className="fas fa-check-circle"></i>
                                        <p>
                                            {language === 'kurdish'
                                                ? 'زۆر باش! تۆ بە سەرکەوتوویی ناونیشانی سەلامەتت ناسیەوە.'
                                                : 'Very good! You successfully identified the safe URLs.'}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-times-circle"></i>
                                        <p>
                                            {language === 'kurdish'
                                                ? 'هەندێک هەڵەت کردووە. لەبیرت بێت ناونیشانی سەلامەت پێویستی بە HTTPS هەیە و ناوی ڕێک و فەرمی.'
                                                : 'You made some mistakes. Remember that safe URLs need HTTPS and proper, official names.'}
                                        </p>
                                    </>
                                ))}
                        </div>
                    )}
                </>
            ) : (
                <FeatureIdentification
                    features={urlFeatures}
                    onComplete={checkFeatureAnswers}
                    language={language}
                />
            )}
        </div>
    );
};

const FeatureIdentification = ({ features, onComplete, language }) => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const toggleFeature = (id) => {
        if (selectedFeatures.includes(id)) {
            setSelectedFeatures(selectedFeatures.filter(fId => fId !== id));
        } else {
            setSelectedFeatures([...selectedFeatures, id]);
        }
    };

    return (
        <>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'کامیان لەم تایبەتمەندیانە نیشانەکانی ناونیشانی سەلامەتن؟'
                    : 'Which of these features indicate a safe URL?'}
            </p>

            <div className="features-list">
                {features.map(feature => (
                    <div
                        key={feature.id}
                        className={`feature-item ${selectedFeatures.includes(feature.id) ? 'selected' : ''}`}
                        onClick={() => toggleFeature(feature.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature.id)}
                            readOnly
                        />
                        <label>{feature.feature}</label>
                    </div>
                ))}
            </div>

            <button
                className="check-button"
                onClick={() => onComplete(selectedFeatures)}
                disabled={selectedFeatures.length === 0}
            >
                {language === 'kurdish' ? 'تەواوکردن' : 'Complete'}
            </button>
        </>
    );
};

export default UrlAnalysisChallenge;