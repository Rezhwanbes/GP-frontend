import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const PrivacySettingsChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [browserSettings, setBrowserSettings] = useState({
        cookies: 'some',
        tracking: false,
        https: false,
        location: 'ask',
        passwordSaving: true
    });

    const [searchSettings, setSearchSettings] = useState({
        history: true,
        personalization: true,
        safeSearch: false,
        adTracking: true
    });

    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const handleBrowserChange = (setting, value) => {
        setBrowserSettings({
            ...browserSettings,
            [setting]: value
        });
    };

    const handleSearchChange = (setting, value) => {
        setSearchSettings({
            ...searchSettings,
            [setting]: value
        });
    };

    const checkSettings = () => {
        let browserScore = 0;
        let searchScore = 0;

        // Check browser settings
        if (browserSettings.cookies === 'block') browserScore += 10;
        if (browserSettings.tracking) browserScore += 10;
        if (browserSettings.https) browserScore += 10;
        if (browserSettings.location === 'block') browserScore += 10;
        if (!browserSettings.passwordSaving) browserScore += 10;

        // Check search settings
        if (!searchSettings.history) searchScore += 10;
        if (!searchSettings.personalization) searchScore += 10;
        if (searchSettings.safeSearch) searchScore += 10;
        if (!searchSettings.adTracking) searchScore += 10;

        const totalScore = browserScore + searchScore;
        setScore(totalScore);
        setShowFeedback(true);
        completeChallenge(totalScore);
    };

    const getRecommendation = () => {
        const recommendations = [];

        if (browserSettings.cookies !== 'block') {
            recommendations.push(
                language === 'kurdish'
                    ? "• بلۆکی کوکییەکانی پەیوەندینەکراو"
                    : "• Block third-party cookies"
            );
        }

        if (!browserSettings.tracking) {
            recommendations.push(
                language === 'kurdish'
                    ? "• چالاککردنی ڕێگری لە شوێنکەوتن"
                    : "• Enable tracking prevention"
            );
        }

        if (!browserSettings.https) {
            recommendations.push(
                language === 'kurdish'
                    ? "• چالاککردنی HTTPS بە شێوەیەکی خۆکار"
                    : "• Enable automatic HTTPS"
            );
        }

        if (browserSettings.location !== 'block') {
            recommendations.push(
                language === 'kurdish'
                    ? "• بلۆکی ئاستی شوێن"
                    : "• Block location access"
            );
        }

        if (browserSettings.passwordSaving) {
            recommendations.push(
                language === 'kurdish'
                    ? "• نەهێشتنی وشەی نهێنی لە وێبگەڕەکەت"
                    : "• Disable password saving in browser"
            );
        }

        if (searchSettings.history) {
            recommendations.push(
                language === 'kurdish'
                    ? "• نەهێشتنی مێژووی گەڕان"
                    : "• Disable search history"
            );
        }

        if (searchSettings.personalization) {
            recommendations.push(
                language === 'kurdish'
                    ? "• نەهێشتنی کەسیکردنەوە"
                    : "• Disable search personalization"
            );
        }

        if (!searchSettings.safeSearch) {
            recommendations.push(
                language === 'kurdish'
                    ? "• چالاککردنی گەڕانی سەلامەت"
                    : "• Enable safe search"
            );
        }

        if (searchSettings.adTracking) {
            recommendations.push(
                language === 'kurdish'
                    ? "• ڕێگری لە شوێنکەوتنی ڕیکلام"
                    : "• Disable ad tracking"
            );
        }

        return recommendations.length > 0 ? recommendations : [
            language === 'kurdish'
                ? "• هەموو ڕێکخستنەکانت سەلامەتن!"
                : "• All your settings are secure!"
        ];
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: ڕێکخستنەکانی پاراستنی نهێنی' : 'Activity 3: Privacy Settings'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'ڕێکخستنەکانی خۆت دابنێ بۆ پاراستنی نهێنی'
                    : 'Configure your settings for privacy protection'}
            </p>

            <div className="settings-container">
                <div className="settings-section">
                    <h4>{language === 'kurdish' ? 'ڕێکخستنەکانی وێبگەڕ:' : 'Browser Settings:'}</h4>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'مامەڵە لەگەڵ کوکی:' : 'Cookie handling:'}</label>
                        <select
                            value={browserSettings.cookies}
                            onChange={(e) => handleBrowserChange('cookies', e.target.value)}
                        >
                            <option value="all">
                                {language === 'kurdish' ? 'قبوڵکردنی هەموو کوکییەکان' : 'Accept all cookies'}
                            </option>
                            <option value="some">
                                {language === 'kurdish' ? 'تەنها کوکییە پەیوەندینەکراوەکان' : 'Only first-party cookies'}
                            </option>
                            <option value="block">
                                {language === 'kurdish' ? 'ڕێگری لە هەموو کوکییەکان' : 'Block all cookies'}
                            </option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'ڕێگری لە شوێنکەوتن:' : 'Tracking prevention:'}</label>
                        <input
                            type="checkbox"
                            checked={browserSettings.tracking}
                            onChange={(e) => handleBrowserChange('tracking', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'HTTPS بە شێوەیەکی خۆکار:' : 'Automatic HTTPS:'}</label>
                        <input
                            type="checkbox"
                            checked={browserSettings.https}
                            onChange={(e) => handleBrowserChange('https', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'دەستگەیشتن بە شوێن:' : 'Location access:'}</label>
                        <select
                            value={browserSettings.location}
                            onChange={(e) => handleBrowserChange('location', e.target.value)}
                        >
                            <option value="allow">
                                {language === 'kurdish' ? 'ڕێگەدان' : 'Allow'}
                            </option>
                            <option value="ask">
                                {language === 'kurdish' ? 'پرسیارکردن' : 'Ask'}
                            </option>
                            <option value="block">
                                {language === 'kurdish' ? 'ڕێگری' : 'Block'}
                            </option>
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'هەڵگرتنی وشەی نهێنی:' : 'Password saving:'}</label>
                        <input
                            type="checkbox"
                            checked={browserSettings.passwordSaving}
                            onChange={(e) => handleBrowserChange('passwordSaving', e.target.checked)}
                        />
                    </div>
                </div>

                <div className="settings-section">
                    <h4>{language === 'kurdish' ? 'ڕێکخستنەکانی مووتۆری گەڕان:' : 'Search Engine Settings:'}</h4>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'هەڵگرتنی مێژووی گەڕان:' : 'Save search history:'}</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.history}
                            onChange={(e) => handleSearchChange('history', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'کەسیکردنەوەی ئەنجامەکان:' : 'Personalized results:'}</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.personalization}
                            onChange={(e) => handleSearchChange('personalization', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'گەڕانی سەلامەت:' : 'Safe search:'}</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.safeSearch}
                            onChange={(e) => handleSearchChange('safeSearch', e.target.checked)}
                        />
                    </div>

                    <div className="setting-item">
                        <label>{language === 'kurdish' ? 'شوێنکەوتنی ڕیکلام:' : 'Ad tracking:'}</label>
                        <input
                            type="checkbox"
                            checked={searchSettings.adTracking}
                            onChange={(e) => handleSearchChange('adTracking', e.target.checked)}
                        />
                    </div>
                </div>
            </div>

            <button className="check-button" onClick={checkSettings}>
                {language === 'kurdish' ? 'پشکنینی ڕێکخستنەکان' : 'Check Settings'}
            </button>

            {showFeedback && (
                <div className={`feedback ${score >= 70 ? 'correct' : 'incorrect'}`}>
                    {score >= 70 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! ڕێکخستنەکانی پاراستنی نهێنی تۆ زۆر سەلامەتن.'
                                    : 'Excellent! Your privacy settings are very secure.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'ڕێکخستنەکانت پێویستی بە باشترکردن هەیە. ئەم ڕەسەنانەی خوارەوە پێشنیار دەکرێن:'
                                    : 'Your settings need improvement. The following recommendations are suggested:'}
                            </p>
                            <ul className="recommendations">
                                {getRecommendation().map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    <p>
                        {language === 'kurdish' ? 'کۆی خاڵەکان: ' : 'Total score: '}{score}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PrivacySettingsChallenge;