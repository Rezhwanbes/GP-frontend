import React, { useState } from 'react';
import '../../../../assets/styles/games/challenge-1.css';
import {useLanguage} from "../../../../LanguageContext.jsx";
const Challenge1 = ({ updateScore, goToNextChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [activeTab, setActiveTab] = useState('privacy');
    const [privateAccount, setPrivateAccount] = useState(false);
    const [commentPrivacy, setCommentPrivacy] = useState('all');
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [locationSharing, setLocationSharing] = useState('all');
    const [activityStatus, setActivityStatus] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [settingsChecked, setSettingsChecked] = useState(false);

    const checkPrivacySettings = () => {
        const isPrivateAccountValid = privateAccount === true;
        const isCommentPrivacyValid = ['followers', 'followings', 'nobody'].includes(commentPrivacy);
        const isTwoFactorValid = twoFactorAuth === true;
        const isLocationValid = ['close_friends', 'nobody'].includes(locationSharing);
        const isActivityValid = activityStatus === false;

        const isCorrect = isPrivateAccountValid &&
            isCommentPrivacyValid &&
            isTwoFactorValid &&
            isLocationValid &&
            isActivityValid;

        setSettingsChecked(true);

        if (isCorrect) {
            setModalContent({
                title: language === 'kurdish' ? 'باش کرا!' : 'Well done!',
                icon: 'check-circle',
                message: language === 'kurdish'
                    ? 'تۆ ڕێکخستنەکانی تایبەتمەندی سارات بە باشی ڕێکخست.'
                    : 'You have successfully configured the privacy settings.',
                details: language === 'kurdish' ? [
                    'تەنها ئەو کەسانە دەتوانن پرۆفایلەکەی ببینن کە فۆڵۆی دەکەن',
                    'کۆمێنتەکان بەشێوەیەکی باش کۆنترۆڵ کراون',
                    'دووفاکتەری ئۆتێنتیکەیشن چالاک کراوە',
                    'زانیاری شوێن پارێزراوە',
                    'چالاکییەکانی پیشان نادرێت'
                ] : [
                    'Only followers can see the profile',
                    'Comments are well controlled',
                    'Two-factor authentication is enabled',
                    'Location information is protected',
                    'Activity status is hidden'
                ],
                buttonText: language === 'kurdish' ? 'چالاکی دووەم' : 'Next Challenge',
                isSuccess: true
            });
            updateScore(10);
        } else {
            const incorrectSettings = [];
            if (!isPrivateAccountValid) incorrectSettings.push(language === 'kurdish'
                ? 'ئەکاونتی تایبەت چالاک بکە'
                : 'Enable private account');
            if (!isCommentPrivacyValid) incorrectSettings.push(language === 'kurdish'
                ? 'پاراستنی کۆمێنتەکان ڕێکبخە'
                : 'Configure comment privacy');
            if (!isTwoFactorValid) incorrectSettings.push(language === 'kurdish'
                ? 'دووفاکتەری ئۆتێنتیکەیشن چالاک بکە'
                : 'Enable two-factor authentication');
            if (!isLocationValid) incorrectSettings.push(language === 'kurdish'
                ? 'پیشاندانی شوێن سنووردار بکە'
                : 'Limit location sharing');
            if (!isActivityValid) incorrectSettings.push(language === 'kurdish'
                ? 'چالاکییەکان شارەوە بکە'
                : 'Hide activity status');

            setModalContent({
                title: language === 'kurdish' ? 'پێویستە باشتر بکرێت' : 'Needs improvement',
                icon: 'times-circle',
                message: language === 'kurdish'
                    ? 'ئەم ڕێکخستنانە پێویستیان بە باشترکردن هەیە:'
                    : 'These settings need improvement:',
                details: incorrectSettings,
                buttonText: language === 'kurdish' ? 'باشە، دەستپێدەکەمەوە' : 'OK, I\'ll try again',
                isSuccess: false
            });
        }
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (modalContent.isSuccess) {
            goToNextChallenge(2);
        }
    };

    const showMoreHints = () => {
        setModalContent({
            title: language === 'kurdish' ? 'ئامۆژگاری زیاتر' : 'More Tips',
            icon: 'lightbulb',
            message: language === 'kurdish' ? 'بۆ پاراستنی باشتر:' : 'For better protection:',
            details: language === 'kurdish' ? [
                'ڕێکخستنی ئەکاونتی تایبەت چالاک بکە',
                'دووفاکتەری ئۆتێنتیکەیشن بەکاربهێنە',
                'زانیاری شوێن و چالاکی بە تایبەتی بهێڵەرەوە',
                'کۆمێنتەکان تەنها بۆ ئەو کەسانە ڕێگە بدە کە ناسریان پێدەدەیت'
            ] : [
                'Enable private account setting',
                'Use two-factor authentication',
                'Keep location and activity information private',
                'Allow comments only from people you know'
            ],
            buttonText: language === 'kurdish' ? 'تێگەیشتم' : 'Got it',
            isSuccess: false
        });
        setShowModal(true);
    };

    return (
        <div className="challenge-container" id="challenge1">
            <h3>{language === 'kurdish' ? 'چالاکی ١: ڕێکخستنی ڕێکخستنەکانی تایبەتمەندی' : 'Challenge 1: Privacy Settings Configuration'}</h3>
            <p className="challenge-intro">
                {language === 'kurdish'
                    ? 'یەکەم هەنگاو بۆ پاراستنی هەژماری سۆشیال میدیا، ڕێکخستنی ڕێکخستنەکانی تایبەتمەندییە. یارمەتی سارا بدە بۆ ڕێکخستنی ڕێکخستنەکانی تایبەتمەندی هەژماری ئینستاگرامەکەی:'
                    : 'The first step to protecting social media accounts is configuring privacy settings. Help Sara configure her Instagram account privacy settings:'}
            </p>

            <div className="social-profile">
                <div className="profile-header">
                    <div className="profile-name">
                        <div className="profile-avatar">
                            <i className="fas fa-user"></i>
                        </div>
                        <h4>sara_kurd</h4>
                    </div>
                    <div className="profile-settings">
                        <button className="setting-btn"><i className="fas fa-bell"></i></button>
                        <button className="setting-btn"><i className="fas fa-cog"></i></button>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="tab-container">
                        <div className="tabs">
                            <div
                                className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                                data-tab="profile"
                            >
                                {language === 'kurdish' ? 'پرۆفایل' : 'Profile'}
                            </div>
                            <div
                                className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')}
                                data-tab="settings"
                            >
                                {language === 'kurdish' ? 'ڕێکخستنەکان' : 'Settings'}
                            </div>
                            <div
                                className={`tab ${activeTab === 'privacy' ? 'active' : ''}`}
                                onClick={() => setActiveTab('privacy')}
                                data-tab="privacy"
                            >
                                {language === 'kurdish' ? 'تایبەتمەندی' : 'Privacy'}
                            </div>
                        </div>

                        <div id="profile" className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
                            <p>{language === 'kurdish' ? 'زانیاری پرۆفایل لێرە پیشان دەدرێت.' : 'Profile information will be shown here.'}</p>
                        </div>

                        <div id="settings" className={`tab-content ${activeTab === 'settings' ? 'active' : ''}`}>
                            <p>{language === 'kurdish' ? 'ڕێکخستنەکانی گشتی لێرە پیشان دەدرێت.' : 'General settings will be shown here.'}</p>
                        </div>

                        <div id="privacy" className={`tab-content ${activeTab === 'privacy' ? 'active' : ''}`}>
                            <ul className="settings-list">
                                <li className="settings-item">
                                    <div className="settings-info">
                                        <div className="settings-title">
                                            {language === 'kurdish' ? 'ئەکاونتی تایبەت' : 'Private Account'}
                                        </div>
                                        <div className="settings-description">
                                            {language === 'kurdish'
                                                ? 'تەنها ئەو کەسانە دەتوانن پرۆفایلەکەت و پۆستەکانت ببینن کە فۆڵۆت دەکەن'
                                                : 'Only people who follow you can see your profile and posts'}
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            id="privateAccount"
                                            checked={privateAccount}
                                            onChange={(e) => setPrivateAccount(e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </li>
                                <li className="settings-item">
                                    <div className="settings-info">
                                        <div className="settings-title">
                                            {language === 'kurdish' ? 'پاراستنی کۆمێنتەکان' : 'Comment Privacy'}
                                        </div>
                                        <div className="settings-description">
                                            {language === 'kurdish'
                                                ? 'کۆنترۆڵی کێ دەتوانێت کۆمێنت بنووسێت لەسەر پۆستەکانت'
                                                : 'Control who can comment on your posts'}
                                        </div>
                                    </div>
                                    <select
                                        className="privacy-dropdown"
                                        id="commentPrivacy"
                                        value={commentPrivacy}
                                        onChange={(e) => setCommentPrivacy(e.target.value)}
                                    >
                                        <option value="all">{language === 'kurdish' ? 'هەموو کەسێک' : 'Everyone'}</option>
                                        <option value="followers">{language === 'kurdish' ? 'تەنها ئەوانەی فۆڵۆت دەکەن' : 'Followers only'}</option>
                                        <option value="followings">{language === 'kurdish' ? 'تەنها ئەوانەی فۆڵۆت دەکەن و تۆش فۆڵۆتن' : 'People you follow back'}</option>
                                        <option value="nobody">{language === 'kurdish' ? 'هیچ کەسێک' : 'No one'}</option>
                                    </select>
                                </li>
                                <li className="settings-item">
                                    <div className="settings-info">
                                        <div className="settings-title">
                                            {language === 'kurdish' ? 'دووفاکتەری ئۆتێنتیکەیشن' : 'Two-Factor Authentication'}
                                        </div>
                                        <div className="settings-description">
                                            {language === 'kurdish'
                                                ? 'ئەم ڕێگایە پارێزگاری زیاتر بۆ هەژمارەکەت دابین دەکات'
                                                : 'This provides extra security for your account'}
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            id="twoFactorAuth"
                                            checked={twoFactorAuth}
                                            onChange={(e) => setTwoFactorAuth(e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </li>
                                <li className="settings-item">
                                    <div className="settings-info">
                                        <div className="settings-title">
                                            {language === 'kurdish' ? 'پیشاندانی شوێن' : 'Location Sharing'}
                                        </div>
                                        <div className="settings-description">
                                            {language === 'kurdish'
                                                ? 'کۆنترۆڵی ئایا شوێنت لەگەڵ پۆستەکانت نیشان بدرێت'
                                                : 'Control whether your location is shown with posts'}
                                        </div>
                                    </div>
                                    <select
                                        className="privacy-dropdown"
                                        id="locationSharing"
                                        value={locationSharing}
                                        onChange={(e) => setLocationSharing(e.target.value)}
                                    >
                                        <option value="all">{language === 'kurdish' ? 'هەموو کەسێک' : 'Everyone'}</option>
                                        <option value="followers">{language === 'kurdish' ? 'تەنها ئەوانەی فۆڵۆت دەکەن' : 'Followers only'}</option>
                                        <option value="close_friends">{language === 'kurdish' ? 'تەنها هاوڕێ نزیکەکان' : 'Close friends only'}</option>
                                        <option value="nobody">{language === 'kurdish' ? 'هیچ کەسێک' : 'No one'}</option>
                                    </select>
                                </li>
                                <li className="settings-item">
                                    <div className="settings-info">
                                        <div className="settings-title">
                                            {language === 'kurdish' ? 'پیشاندانی چالاکی' : 'Activity Status'}
                                        </div>
                                        <div className="settings-description">
                                            {language === 'kurdish'
                                                ? 'پیشاندانی کاتی دواجار ئۆنلاین بوون'
                                                : 'Show when you were last active'}
                                        </div>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            id="activityStatus"
                                            checked={activityStatus}
                                            onChange={(e) => setActivityStatus(e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hint-container">
                <div className="hint-title"><i className="fas fa-lightbulb"></i> {language === 'kurdish' ? 'ئامۆژگاری' : 'Hint'}</div>
                <p>
                    {language === 'kurdish'
                        ? 'بیر لە ئاستی پاراستنی تایبەتمەندی بکەرەوە کە پێویستە بۆ سارا. زۆربەی ڕێکخستنەکانی تایبەتمەندی پێشوەختە بۆ "هەموو کەسێک" ڕێکخراون، بەڵام ئایا ئەمە باشترین ڕێگایە بۆ پاراستنی هەژمارەکە؟'
                        : 'Consider the level of privacy protection Sara needs. Most privacy settings are preset to "Everyone", but is this the best way to protect the account?'}
                </p>
            </div>

            <div className="action-buttons">
                <button className="btn btn-secondary" onClick={showMoreHints}>
                    <i className="fas fa-question-circle"></i> {language === 'kurdish' ? 'ئامۆژگاری زیاتر' : 'More Tips'}
                </button>
                <button
                    className={`btn btn-check ${settingsChecked ? 'checked' : ''}`}
                    onClick={checkPrivacySettings}
                >
                    {settingsChecked ? (
                        <><i className="fas fa-check"></i> {language === 'kurdish' ? 'پشکنینی دووبارە' : 'Check Again'}</>
                    ) : (
                        <><i className="fas fa-shield-alt"></i> {language === 'kurdish' ? 'پشکنینی ڕێکخستنەکان' : 'Check Settings'}</>
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
                            {modalContent.details && (
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

export default Challenge1;