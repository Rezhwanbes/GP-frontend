import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const FirewallChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [firewallStatus, setFirewallStatus] = useState({
        incoming: 'medium',
        outgoing: 'low',
        notifications: true,
        autoUpdate: false
    });
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const optimalSettings = {
        incoming: 'high',
        outgoing: 'medium',
        notifications: true,
        autoUpdate: true
    };

    const handleSettingChange = (setting, value) => {
        setFirewallStatus(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    const checkSettings = () => {
        let calculatedScore = 0;

        // Check each setting against optimal
        if (firewallStatus.incoming === optimalSettings.incoming) calculatedScore += 25;
        if (firewallStatus.outgoing === optimalSettings.outgoing) calculatedScore += 25;
        if (firewallStatus.notifications === optimalSettings.notifications) calculatedScore += 25;
        if (firewallStatus.autoUpdate === optimalSettings.autoUpdate) calculatedScore += 25;

        setScore(calculatedScore);
        setShowFeedback(true);

        setTimeout(() => completeChallenge(calculatedScore), 3000);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: ڕێکخستنی دیوارە ئاگرین' : 'Activity 3: Firewall Configuration'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'دیوارە ئاگرین یەکێکە لە گرنگترین ئامرازەکانی پاراستنی کۆمپیوتەر. ڕێکخستنەکانی خوارەوە بگۆڕە بۆ پاراستنی باشتر.'
                    : 'The firewall is one of the most important computer protection tools. Adjust the settings below for better protection.'}
            </p>

            <div className="firewall-settings">
                <div className="setting-group">
                    <h4>{language === 'kurdish' ? 'پاراستنی ناوهات:' : 'Incoming Protection:'}</h4>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="incoming"
                                checked={firewallStatus.incoming === 'high'}
                                onChange={() => handleSettingChange('incoming', 'high')}
                            />
                            {language === 'kurdish' ? 'بەهێز (باشترین پاراستن)' : 'High (best protection)'}
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="incoming"
                                checked={firewallStatus.incoming === 'medium'}
                                onChange={() => handleSettingChange('incoming', 'medium')}
                            />
                            {language === 'kurdish' ? 'مامناوەند (پاراستنی ناوەندی)' : 'Medium (average protection)'}
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="incoming"
                                checked={firewallStatus.incoming === 'low'}
                                onChange={() => handleSettingChange('incoming', 'low')}
                            />
                            {language === 'kurdish' ? 'بەهێز نەبوو (زۆر مەترسیدار)' : 'Low (very risky)'}
                        </label>
                    </div>
                </div>

                <div className="setting-group">
                    <h4>{language === 'kurdish' ? 'پاراستنی دەرهات:' : 'Outgoing Protection:'}</h4>
                    <div className="radio-options">
                        <label>
                            <input
                                type="radio"
                                name="outgoing"
                                checked={firewallStatus.outgoing === 'high'}
                                onChange={() => handleSettingChange('outgoing', 'high')}
                            />
                            {language === 'kurdish'
                                ? 'بەهێز (لەوانەیە هەندێک خاڵی ڕاستەقینە بلۆک بکات)'
                                : 'High (might block some legitimate traffic)'}
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="outgoing"
                                checked={firewallStatus.outgoing === 'medium'}
                                onChange={() => handleSettingChange('outgoing', 'medium')}
                            />
                            {language === 'kurdish' ? 'مامناوەند (باشترین هەڵبژاردە)' : 'Medium (best option)'}
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="outgoing"
                                checked={firewallStatus.outgoing === 'low'}
                                onChange={() => handleSettingChange('outgoing', 'low')}
                            />
                            {language === 'kurdish' ? 'بەهێز نەبوو (مەترسیدار)' : 'Low (risky)'}
                        </label>
                    </div>
                </div>

                <div className="setting-group">
                    <h4>{language === 'kurdish' ? 'ئاگاداریەکان:' : 'Notifications:'}</h4>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={firewallStatus.notifications}
                            onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                        />
                        <span className="slider"></span>
                        {firewallStatus.notifications
                            ? (language === 'kurdish' ? 'چالاکە' : 'Enabled')
                            : (language === 'kurdish' ? 'ناچالاکە' : 'Disabled')}
                    </label>
                    <p className="setting-description">
                        {language === 'kurdish'
                            ? 'ئاگاداریەکان یارمەتیت دەدات بزانیت کەی هێرشێک ڕوویداوە.'
                            : 'Notifications help you know when an attack occurs.'}
                    </p>
                </div>

                <div className="setting-group">
                    <h4>{language === 'kurdish' ? 'نوێکردنەوەی خۆکار:' : 'Auto Update:'}</h4>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={firewallStatus.autoUpdate}
                            onChange={(e) => handleSettingChange('autoUpdate', e.target.checked)}
                        />
                        <span className="slider"></span>
                        {firewallStatus.autoUpdate
                            ? (language === 'kurdish' ? 'چالاکە' : 'Enabled')
                            : (language === 'kurdish' ? 'ناچالاکە' : 'Disabled')}
                    </label>
                    <p className="setting-description">
                        {language === 'kurdish'
                            ? 'نوێکردنەوەی خۆکار پاراستنەکەت بە ڕێژە دەکات.'
                            : 'Auto-updating keeps your protection current.'}
                    </p>
                </div>
            </div>

            <button className="check-button" onClick={checkSettings}>
                {language === 'kurdish' ? 'پشکنینی ڕێکخستنەکان' : 'Check Settings'}
            </button>

            {showFeedback && (
                <div className={`feedback ${score >= 75 ? 'correct' : score >= 50 ? 'warning' : 'incorrect'}`}>
                    {score >= 75 ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! ڕێکخستنەکانی دیوارە ئاگرینەکەت زۆر پارێزەرانەن.'
                                    : 'Excellent! Your firewall settings are very secure.'}
                            </p>
                        </>
                    ) : score >= 50 ? (
                        <>
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'باشە، بەڵام دەتوانی باشتر بکەیت! هەندێک ڕێکخستن پاراستنی باشتر دەوێت.'
                                    : 'Good, but you can do better! Some settings need improvement.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'ڕێکخستنەکانی دیوارە ئاگرینەکەت زۆر مەترسیدارن. پێویستە گۆڕانکاری تێدا بکەیت.'
                                    : 'Your firewall settings are very risky. You need to make changes.'}
                            </p>
                        </>
                    )}
                    <p>
                        {language === 'kurdish' ? 'کۆی خاڵەکان: ' : 'Total score: '}{score} {language === 'kurdish' ? 'لە ١٠٠' : 'out of 100'}
                    </p>

                    {score < 100 && (
                        <div className="recommendations">
                            <h5>{language === 'kurdish' ? 'پێشنیارەکان:' : 'Recommendations:'}</h5>
                            <ul>
                                {firewallStatus.incoming !== optimalSettings.incoming && (
                                    <li>
                                        {language === 'kurdish'
                                            ? 'پاراستنی ناوهات بگۆڕە بۆ "بەهێز"'
                                            : 'Change incoming protection to "High"'}
                                    </li>
                                )}
                                {firewallStatus.outgoing !== optimalSettings.outgoing && (
                                    <li>
                                        {language === 'kurdish'
                                            ? 'پاراستنی دەرهات بگۆڕە بۆ "مامناوەند"'
                                            : 'Change outgoing protection to "Medium"'}
                                    </li>
                                )}
                                {firewallStatus.notifications !== optimalSettings.notifications && (
                                    <li>
                                        {language === 'kurdish'
                                            ? 'ئاگاداریەکان چالاک بکە'
                                            : 'Enable notifications'}
                                    </li>
                                )}
                                {firewallStatus.autoUpdate !== optimalSettings.autoUpdate && (
                                    <li>
                                        {language === 'kurdish'
                                            ? 'نوێکردنەوەی خۆکار چالاک بکە'
                                            : 'Enable auto-update'}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FirewallChallenge;