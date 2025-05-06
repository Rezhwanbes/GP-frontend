import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";
const AppPermissionChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [permissions, setPermissions] = useState([
        {
            id: 1,
            app: language === 'kurdish' ? "ئەپی کاتژمێر" : "Clock App",
            requested: language === 'kurdish' ? "دەستگەیشتن بە پەیامەکان" : "Access to Messages",
            necessary: false,
            allowed: false
        },
        {
            id: 2,
            app: language === 'kurdish' ? "ئەپی وێنە" : "Photo App",
            requested: language === 'kurdish' ? "دەستگەیشتن بە گالێری" : "Access to Gallery",
            necessary: true,
            allowed: true
        },
        {
            id: 3,
            app: language === 'kurdish' ? "یاری" : "Game",
            requested: language === 'kurdish' ? "دەستگەیشتن بە پەیامەکان" : "Access to Messages",
            necessary: false,
            allowed: false
        },
        {
            id: 4,
            app: language === 'kurdish' ? "ئەپی تەندروستی" : "Health App",
            requested: language === 'kurdish' ? "دەستگەیشتن بە شوێن" : "Access to Location",
            necessary: false,
            allowed: false
        },
        {
            id: 5,
            app: language === 'kurdish' ? "ئەپی نەخشە" : "Maps App",
            requested: language === 'kurdish' ? "دەستگەیشتن بە شوێن" : "Access to Location",
            necessary: true,
            allowed: true
        },
        {
            id: 6,
            app: language === 'kurdish' ? "ئەپی ڕێنمایی" : "Navigation App",
            requested: language === 'kurdish' ? "دەستگەیشتن بە کامێرا" : "Access to Camera",
            necessary: false,
            allowed: false
        }
    ]);
    const [showFeedback, setShowFeedback] = useState(false);

    const togglePermission = (id) => {
        setPermissions(permissions.map(perm =>
            perm.id === id ? { ...perm, allowed: !perm.allowed } : perm
        ));
    };

    const checkPermissions = () => {
        setShowFeedback(true);
        const correctCount = permissions.filter(perm =>
            perm.allowed === perm.necessary
        ).length;
        const score = Math.floor((correctCount / permissions.length) * 40);

        if (correctCount === permissions.length) {
            setTimeout(() => completeChallenge(score), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: بەڕێوەبردنی مۆڵەتی ئەپەکان' : 'Activity 3: Managing App Permissions'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'بڕیار بدە کامی لەم مۆڵەتانە پێویستە چالاک بکرێن یان نا:'
                    : 'Decide which of these permissions should be activated or not:'}
            </p>

            <div className="permissions-list">
                {permissions.map(permission => (
                    <div key={permission.id} className="permission-item">
                        <div className="permission-info">
                            <h4>{permission.app}</h4>
                            <p>
                                {language === 'kurdish'
                                    ? 'داوای دەستگەیشتن بە: '
                                    : 'Requests access to: '}{permission.requested}
                            </p>
                            <p className={`necessity ${permission.necessary ? 'necessary' : 'unnecessary'}`}>
                                {permission.necessary
                                    ? (language === 'kurdish' ? 'پێویستە' : 'Necessary')
                                    : (language === 'kurdish' ? 'پێویست نییە' : 'Unnecessary')}
                            </p>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={permission.allowed}
                                onChange={() => togglePermission(permission.id)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkPermissions}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className="feedback">
                    <h4>{language === 'kurdish' ? 'ڕێنمایی بۆ مۆڵەتی ئەپەکان:' : 'Guidelines for App Permissions:'}</h4>
                    <ul>
                        <li>
                            {language === 'kurdish'
                                ? 'هەرگیز مۆڵەتی دەستگەیشتن بە پەیامەکان مەدە بە ئەپێک کە پەیام ناردن و وەرگرتن نییە.'
                                : "Never give message access to apps that don't need to send/receive messages."}
                        </li>
                        <li>
                            {language === 'kurdish'
                                ? 'ئەپەکانی نەخشە و شوێن پێویستیان بە مۆڵەتی شوێن هەیە.'
                                : 'Map and navigation apps need location permission.'}
                        </li>
                        <li>
                            {language === 'kurdish'
                                ? 'ئەپەکانی وێنە پێویستیان بە مۆڵەتی گالێری هەیە.'
                                : 'Photo apps need gallery permission.'}
                        </li>
                        <li>
                            {language === 'kurdish'
                                ? 'ئەپەکانی کاتژمێر و یاری بە گشتی پێویستیان بە مۆڵەتی کامێرا و پەیام نییە.'
                                : 'Clock and game apps generally don\'t need camera or message permissions.'}
                                </li>
                                </ul>
                                </div>
                                )}
                </div>
            );
            };

            export default AppPermissionChallenge;