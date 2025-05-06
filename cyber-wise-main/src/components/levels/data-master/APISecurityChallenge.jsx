import React, { useState } from 'react';
import {useLanguage} from "../../../LanguageContext.jsx";

const APISecurityChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [code, setCode] = useState(`function getUserData(userId) {
    // API call to get user data
    return fetch('/api/users/' + userId)
        .then(response => response.json());
}`);
    const [fixedCode, setFixedCode] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const vulnerabilities = [
        {
            id: 1,
            name: language === 'kurdish' ? "SQL Injection" : "SQL Injection",
            fixed: false
        },
        {
            id: 2,
            name: language === 'kurdish' ? "IDOR (Insecure Direct Object Reference)" : "IDOR (Insecure Direct Object Reference)",
            fixed: false
        },
        {
            id: 3,
            name: language === 'kurdish' ? "Missing Authentication" : "Missing Authentication",
            fixed: false
        },
        {
            id: 4,
            name: language === 'kurdish' ? "Sensitive Data Exposure" : "Sensitive Data Exposure",
            fixed: false
        }
    ];

    const checkCode = () => {
        let newScore = 0;
        let fixed = `function getUserData(userId) {
    // ${language === 'kurdish' ? "پشکنینی نێردراوەکە" : "Validate user input"}
    if (!userId || !/^\\d+$/.test(userId)) {
        throw new Error('${language === 'kurdish' ? "IDی بەکارهێنەر نادروستە" : "Invalid user ID"}');
    }
    
    // ${language === 'kurdish' ? "پشکنینی دەسەڵات" : "Check if authenticated user has access to this data"}
    if (!isAuthorized(userId)) {
        throw new Error('${language === 'kurdish' ? "ڕێگەپێنەدراو" : "Unauthorized"}');
    }
    
    // ${language === 'kurdish' ? "APIی بە پارامێتر" : "API call with parameterized query"}
    return fetch('/api/users/' + encodeURIComponent(userId), {
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('${language === 'kurdish' ? "داواکاری سەرنەکەوتوو" : "Request failed"}');
        return response.json();
    })
    .then(data => {
        // ${language === 'kurdish' ? "لابردنی زانیاری حەساس" : "Remove sensitive data before returning"}
        const { password, ssn, ...safeData } = data;
        return safeData;
    });
}`;

        // Check if user fixed SQL injection
        if (code.includes("encodeURIComponent") || code.includes("parameter")) {
            vulnerabilities[0].fixed = true;
            newScore += 10;
        }

        // Check if user added authorization
        if (code.includes("Authorization") || code.includes("isAuthorized")) {
            vulnerabilities[1].fixed = true;
            vulnerabilities[2].fixed = true;
            newScore += 20;
        }

        // Check if user filtered sensitive data
        if (code.includes("safeData") || code.includes("remove sensitive")) {
            vulnerabilities[3].fixed = true;
            newScore += 10;
        }

        setFixedCode(fixed);
        setScore(newScore);
        setShowFeedback(true);

        setTimeout(() => completeChallenge(newScore), 3000);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: ئاسایشی API' : 'Activity 3: API Security'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'ئەم کۆدە APIیە چەند کێشەیەکی ئاسایشی هەیە. چاکەکانی پێوە بنووسە یان پێناسە بکە:'
                    : 'This API code has several security issues. Write or describe your fixes:'}
            </p>

            <div className="code-editor">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={15}
                    spellCheck="false"
                />
            </div>

            <button className="check-button" onClick={checkCode}>
                {language === 'kurdish' ? 'پشکنینی کۆد' : 'Check Code'}
            </button>

            {showFeedback && (
                <div className="feedback">
                    <h4>{language === 'kurdish' ? 'کێشەکانی ئاسایشی دۆزرانەوە:' : 'Security Issues Found:'}</h4>
                    <ul>
                        {vulnerabilities.map(vuln => (
                            <li key={vuln.id} className={vuln.fixed ? 'fixed' : 'unfixed'}>
                                {vuln.name} {vuln.fixed ? '✓' : '✗'}
                            </li>
                        ))}
                    </ul>

                    <p>
                        {language === 'kurdish' ? 'کۆی خاڵەکان:' : 'Total score:'} {score} {language === 'kurdish' ? 'لە ٤٠' : 'out of 40'}
                    </p>

                    {score < 30 && (
                        <div className="solution">
                            <h5>{language === 'kurdish' ? 'نمونەی چارەسەر:' : 'Sample Solution:'}</h5>
                            <pre>{fixedCode}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default APISecurityChallenge;