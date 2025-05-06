import React, { useState } from "react";
import { useLanguage } from "../../../LanguageContext.jsx";

const DataMinimizationChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();
    const t = translations[language];

    const [selectedFields, setSelectedFields] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const formFields = [
        {
            id: 1,
            field: language === 'kurdish' ? "ناو" : "Name",
            required: true,
            reason: language === 'kurdish'
                ? "پێویستە بۆ ناسینەوەی بەکارهێنەر"
                : "Required for user identification"
        },
        {
            id: 2,
            field: language === 'kurdish' ? "ناوی باوک" : "Father's name",
            required: false,
            reason: language === 'kurdish'
                ? "تەنها لە کاتی پێویست داوا بکرێت"
                : "Should only be requested when necessary"
        },
        {
            id: 3,
            field: language === 'kurdish' ? "ژمارەی تەلەفۆنی باوک" : "Father's phone number",
            required: false,
            reason: language === 'kurdish'
                ? "زانیاری زۆرە و پێویست نییە"
                : "Too much information and not necessary"
        },
        {
            id: 4,
            field: language === 'kurdish' ? "ناونیشانی تەواو" : "Full address",
            required: false,
            reason: language === 'kurdish'
                ? "تەنها لە کاتی ناردنی کاڵا داوا بکرێت"
                : "Should only be requested for product delivery"
        },
        {
            id: 5,
            field: language === 'kurdish' ? "پۆستی ئەلیکترۆنی" : "Email",
            required: true,
            reason: language === 'kurdish'
                ? "پێویستە بۆ پەیوەندی کردن"
                : "Required for communication"
        },
        {
            id: 6,
            field: language === 'kurdish' ? "بەرواری لەدایکبوون" : "Date of birth",
            required: false,
            reason: language === 'kurdish'
                ? "تەنها لە کاتی پێویست داوا بکرێت"
                : "Should only be requested when necessary"
        },
        {
            id: 7,
            field: language === 'kurdish' ? "ژمارەی نەستە" : "Wrist size",
            required: false,
            reason: language === 'kurdish'
                ? "زانیاری زۆرە و پێویست نییە"
                : "Too much information and not necessary"
        },
        {
            id: 8,
            field: language === 'kurdish' ? "نەخۆشی خوێی" : "Blood disease",
            required: false,
            reason: language === 'kurdish'
                ? "زانیاری حەساسە و پێویست نییە"
                : "Sensitive information and not necessary"
        }
    ];

    const toggleSelection = (id) => {
        if (selectedFields.includes(id)) {
            setSelectedFields(selectedFields.filter(fieldId => fieldId !== id));
        } else {
            setSelectedFields([...selectedFields, id]);
        }
    };

    const checkAnswers = () => {
        const correctFields = formFields.filter(field => field.required).map(field => field.id);
        const userSelectedRequired = correctFields.every(id => selectedFields.includes(id));
        const userSelectedOnlyRequired = selectedFields.every(id => correctFields.includes(id));

        const isPerfect = userSelectedRequired && userSelectedOnlyRequired && selectedFields.length === correctFields.length;
        const isGood = userSelectedRequired && !userSelectedOnlyRequired;

        setShowFeedback(true);

        if (isPerfect) {
            setTimeout(() => completeChallenge(30), 2000);
        } else if (isGood) {
            setTimeout(() => completeChallenge(20), 2000);
        } else {
            setTimeout(() => completeChallenge(10), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>
                {language === 'kurdish'
                    ? 'چالاکی ١: کەمکردنەوەی زانیاری (Data Minimization)'
                    : 'Activity 1: Data Minimization'}
            </h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? "تۆ بەڕێوەبەری پڕۆژەیەکی نوێیت کە پێویستە فۆرمێکی تۆمارکردن دروست بکەیت. تەنها خانە پێویستەکان دیاری بکە:"
                    : "You're managing a new project that requires creating a registration form. Select only the necessary fields:"}
            </p>

            <div className="fields-grid">
                {formFields.map(field => (
                    <div
                        key={field.id}
                        className={`field-card ${selectedFields.includes(field.id) ? 'selected' : ''} ${field.required ? 'required' : ''}`}
                        onClick={() => toggleSelection(field.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedFields.includes(field.id)}
                            readOnly
                        />
                        <div>
                            <label>{field.field}</label>
                            <span className="field-reason">{field.reason}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className={`feedback ${
                    selectedFields.length === formFields.filter(field => field.required).length &&
                    selectedFields.every(id => formFields.find(f => f.id === id).required) ? 'correct' : 'partial'}`}
                >
                    {selectedFields.length === formFields.filter(field => field.required).length &&
                    selectedFields.every(id => formFields.find(f => f.id === id).required) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? "زۆر باش! تەنها خانە پێویستەکانت دیاری کردووە. ئەمە ڕێگایەکی باشە بۆ کەمکردنەوەی مەترسی لەبارەی زانیاری کەسی."
                                    : "Excellent! You've selected only the necessary fields. This is a good practice for minimizing personal data risks."}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-info-circle"></i>
                            <p>
                                {selectedFields.some(id => !formFields.find(f => f.id === id).required) ?
                                    (language === 'kurdish'
                                        ? "هەندێک لە خانەکان کە دیاریت کردوون پێویست نین. لەبیرت بێت کە کەمترین زانیاری کەسی کۆبکەیتەوە."
                                        : "Some fields you selected aren't necessary. Remember to collect the minimum personal data.") :
                                    (language === 'kurdish'
                                        ? "هەندێک لە خانە پێویستەکانت دیاری نەکردووە. دڵنیابە لەوەی کە هەموو زانیاریە پێویستەکان کۆبکەیتەوە."
                                        : "You missed some required fields. Make sure to collect all necessary information.")}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataMinimizationChallenge;