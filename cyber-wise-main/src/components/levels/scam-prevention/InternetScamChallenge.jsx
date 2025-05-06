import React, {useState} from "react";
import {useLanguage} from "../../../LanguageContext.jsx";
const InternetScamChallenge = ({ completeChallenge }) => {
    const { language, translations } = useLanguage();

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const scenarios = [
        {
            id: 1,
            text: language === 'kurdish'
                ? "پەیامێک لە کەسێکی نەناسراویت پێگەیشت کە دەڵێت ١٠٠$ بۆت دابینکردووە بەڵام پێویستە ٥$ کارمەتی بدەیت"
                : "You received a message from a stranger saying they'll give you $100 but you need to pay $5 fee",
            scam: true
        },
        {
            id: 2,
            text: language === 'kurdish'
                ? "ئیمەیڵێک لە کۆمپانیایەکی ناسراویت پێگەیشت کە دەڵێت پێویستە وشەی نهێنی هەژمارەکەت نوێ بکەیتەوە"
                : "You received an email from a known company saying you need to reset your password",
            scam: false
        },
        {
            id: 3,
            text: language === 'kurdish'
                ? "پۆستێک لە تۆڕی کۆمەڵایەتی بینیت کە دەڵێت کلیک لەسەر لینک بکە بۆ بردنەوەی دیاری"
                : "You saw a social media post telling you to click a link to win a prize",
            scam: true
        },
        {
            id: 4,
            text: language === 'kurdish'
                ? "ئەپێکی مۆبایل کە داوات لێدەکات دەستگەیشتن بە هەموو زانیاریەکانی مۆبایلەکەت پێبدەیت"
                : "A mobile app asking for access to all your phone information",
            scam: true
        }
    ];

    const toggleSelection = (id) => {
        if (selectedOptions.includes(id)) {
            setSelectedOptions(selectedOptions.filter(opt => opt !== id));
        } else {
            setSelectedOptions([...selectedOptions, id]);
        }
    };

    const checkAnswers = () => {
        const allCorrect = scenarios.every(scenario =>
            (scenario.scam && selectedOptions.includes(scenario.id)) ||
            (!scenario.scam && !selectedOptions.includes(scenario.id))
        );
        setShowFeedback(true);

        if (allCorrect) {
            setTimeout(() => completeChallenge(35), 2000);
        }
    };

    return (
        <div className="challenge-card">
            <h3>{language === 'kurdish' ? 'چالاکی ٢: فێڵی ئینتەرنێتی' : 'Activity 2: Internet Scams'}</h3>
            <p className="instructions">
                {language === 'kurdish'
                    ? 'کامیان لەم بارانە فێڵی سەمەرەن؟ (هەمووی دیاری بکە)'
                    : 'Which of these scenarios are scams? (Select all)'}
            </p>

            <div className="scenarios-list">
                {scenarios.map(scenario => (
                    <div
                        key={scenario.id}
                        className={`scenario-item ${selectedOptions.includes(scenario.id) ? 'selected' : ''}`}
                        onClick={() => toggleSelection(scenario.id)}
                    >
                        <input
                            type="checkbox"
                            checked={selectedOptions.includes(scenario.id)}
                            readOnly
                        />
                        <label>{scenario.text}</label>
                    </div>
                ))}
            </div>

            <button className="check-button" onClick={checkAnswers}>
                {language === 'kurdish' ? 'پشکنین' : 'Check'}
            </button>

            {showFeedback && (
                <div className={`feedback ${scenarios.every(scenario =>
                    (scenario.scam && selectedOptions.includes(scenario.id)) ||
                    (!scenario.scam && !selectedOptions.includes(scenario.id))) ? 'correct' : 'incorrect'}`}
                >
                    {scenarios.every(scenario =>
                        (scenario.scam && selectedOptions.includes(scenario.id)) ||
                        (!scenario.scam && !selectedOptions.includes(scenario.id))) ? (
                        <>
                            <i className="fas fa-check-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'زۆر باش! تۆ بە سەرکەوتوویی فێڵەکانی سەمەرەت ناسیەوە.'
                                    : 'Very good! You successfully identified the internet scams.'}
                            </p>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-times-circle"></i>
                            <p>
                                {language === 'kurdish'
                                    ? 'هەندێک هەڵەت کردووە. لەبیرت بێت کە هیچ دیارییەکی بێ بەرامبەر نییە و کۆمپانیا فەرمییەکان بەم شێوەیە پەیوەندی ناکەن.'
                                    : 'You made some mistakes. Remember there are no free gifts and official companies don\'t contact you this way.'}
                            </p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default InternetScamChallenge;