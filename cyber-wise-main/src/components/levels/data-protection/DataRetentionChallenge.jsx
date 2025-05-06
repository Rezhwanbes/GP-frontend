import React, { useState } from "react";
import { useLanguage } from "../../../LanguageContext.jsx";

const DataRetentionChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [dragItems, setDragItems] = useState([
        {
            id: 1,
            text: language === 'kurdish' ? "زانیاری کارمەندانی پێشوو" : "Information of former employees",
            category: null,
            correct: "delete"
        },
        {
            id: 2,
            text: language === 'kurdish' ? "تۆماری فرۆشتنەکانی ١٠ ساڵ لەمەوپێش" : "Sales records from 10 years ago",
            category: null,
            correct: "archive"
        },
        {
            id: 3,
            text: language === 'kurdish' ? "ئیمەیڵی کڕیارەکان لە ٣ مانگ لەمەوپێش" : "Customer emails from 3 months ago",
            category: null,
            correct: "keep"
        },
        {
            id: 4,
            text: language === 'kurdish' ? "زانیاری نەخۆشی کارمەندانی پێشوو" : "Health information of former employees",
            category: null,
            correct: "delete"
        },
        {
            id: 5,
            text: language === 'kurdish' ? "کۆپی پاسپۆرتی کڕیارەکان" : "Copies of customers' passports",
            category: null,
            correct: "delete"
        },
        {
            id: 6,
            text: language === 'kurdish' ? "تۆماری پارەدانەکانی ٢ ساڵ لەمەوپێش" : "Payment records from 2 years ago",
            category: null,
            correct: "keep"
        }
    ]);
    const [showFeedback, setShowFeedback] = useState(false);

    const categories = [
        { id: "keep", text: language === 'kurdish' ? "هێشتنەوە (پێویستە)" : "Keep (Required)", color: "green" },
        { id: "archive", text: language === 'kurdish' ? "ئەرشیفکردن (بۆ مێژوو)" : "Archive (For history)", color: "blue" },
        { id: "delete", text: language === 'kurdish' ? "سڕینەوە (پێویست نییە)" : "Delete (Not needed)", color: "red" }
    ];

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const handleDrop = (e, category) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");

        setDragItems(prevItems =>
            prevItems.map(item =>
                item.id === parseInt(id) ? { ...item, category } : item
            )
        );
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const checkAnswers = () => {
        setShowFeedback(true);
        const correctCount = dragItems.filter(item => item.category === item.correct).length;
        const score = Math.floor((correctCount / dragItems.length) * 30);
        setTimeout(() => completeChallenge(score), 2000);
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٣: پاراستنی ماوەی زانیاری (Data Retention)' : 'Activity 3: Data Retention Policy'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? "زانیاریەکان بکە بۆ کۆگای ڕاستەقینەیان بەپێی سیاسەتی پاراستنی زانیاری کۆمپانیاکە"
                    : "Drag the items to their correct categories according to the company's data retention policy"}
            </p>

            <div className="drag-container">
                <div className="drag-items">
                    {dragItems.map(item => (
                        <div
                            key={item.id}
                            className="drag-item"
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>

                <div className="drop-zones">
                    {categories.map(cat => (
                        <div
                            key={cat.id}
                            className={`drop-zone ${cat.color}`}
                            onDrop={(e) => handleDrop(e, cat.id)}
                            onDragOver={handleDragOver}
                        >
                            <h4>{cat.text}</h4>
                            {dragItems
                                .filter(item => item.category === cat.id)
                                .map(item => (
                                    <div key={item.id} className="dropped-item">
                                        {item.text}
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>

            <button className="check-button" onClick={checkAnswers}>
                {language === 'kurdish' ? 'پشکنین' : 'Check Answers'}
            </button>

            {showFeedback && (
                <div className={`feedback ${
                    dragItems.every(item => item.category === item.correct) ? 'correct' : 'partial'
                }`}>
                    {dragItems.every(item => item.category === item.correct) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? "زۆر باش! تۆ بە سەرکەوتوویی زانیاریەکانی جیاکردەوە بەپێی سیاسەتی پاراستنی زانیاری."
                                    : "Excellent! You successfully categorized the information according to the data retention policy."}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? "هەندێک هەڵەت کردووە. لەبیرت بێت کە پێویستە زانیاری تەنها بۆ ماوەی پێویست بپارێزرێت."
                                    : "You made some mistakes. Remember that data should only be kept for the required period."}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataRetentionChallenge;