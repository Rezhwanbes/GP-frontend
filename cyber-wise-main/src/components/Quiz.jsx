import React, { useState, useEffect } from 'react';

const Quiz = ({ level, gameScore, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Kurdish translations
    const translations = {
        quizTitle: "تێستکردن",
        question: "پرسیار",
        of: "لە",
        submit: "ناردن",
        next: "دواتر",
        results: "ئەنجامەکان",
        correct: "وەڵامی ڕاست",
        wrong: "وەڵامی هەڵە",
        yourScore: "هەژماری تۆ",
        continue: "بەردەوامبوون"
    };

    // Quiz questions for each level (in Kurdish with English translations)
    const levelQuestions = {
        1: [
            {
                question: "پاسۆردێکی بەهێز پێویستی بە چیە؟",
                englishQuestion: "What does a strong password require?",
                options: [
                    "تەنها ژمارە",
                    "تەنها پیتی بچووک",
                    "تەواویان",
                    "هیچ کام"
                ],
                englishOptions: [
                    "Only numbers",
                    "Only lowercase letters",
                    "All of them",
                    "None of them"
                ],
                correctAnswer: 2
            },
            {
                question: "کام لەم پاسۆردانە بەهێزە؟",
                englishQuestion: "Which of these passwords is strong?",
                options: [
                    "123456",
                    "password",
                    "S3cur3P@ss",
                    "hello123"
                ],
                englishOptions: [
                    "123456",
                    "password",
                    "S3cur3P@ss",
                    "hello123"
                ],
                correctAnswer: 2
            }
        ],
        2: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی تایبەتمەندی لە سۆشیال میدیا؟",
                englishQuestion: "What is the best way to protect privacy on social media?",
                options: [
                    "هاوبەشی کردنی هەموو زانیارییە کەسییەکان",
                    "ڕێگەدان بە هەموو کەسێک بۆ بینینی پۆستەکان",
                    "بەکارهێنانی پاراستنی دوو هەنگاوە و چێککردنەوەی ڕێگەدانەکان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Sharing all personal information",
                    "Allowing everyone to see your posts",
                    "Using two-factor authentication and checking permissions",
                    "None of these"
                ],
                correctAnswer: 2
            },
            {
                question: "کاتێک لینکێکی نەناسراو وەردەگریت لە سۆشیال میدیا، پێویستە چی بکەیت؟",
                englishQuestion: "When you receive an unknown link on social media, what should you do?",
                options: [
                    "کرتە لەسەر بکە بۆ بینینی",
                    "بیخەرە سەر گەڕان و لێکۆڵینەوە لێی پێش کرتەکردن",
                    "هاوبەشی بکە لەگەڵ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Click on it to see",
                    "Search and investigate it before clicking",
                    "Share it with your friends",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم ڕەفتارانە مەترسیدارە لە سۆشیال میدیا؟",
                englishQuestion: "Which of these behaviors is risky on social media?",
                options: [
                    "وێنەی پاسپۆرت و بڕوانامە هاوبەشکردن",
                    "پۆستکردنی شوێنی نیشتەجێبوون",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Sharing passport and ID photos",
                    "Posting your home location",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 2
            },
            {
                question: "پاراستنی دوو هەنگاوە (2FA) چییە؟",
                englishQuestion: "What is two-factor authentication (2FA)?",
                options: [
                    "تەنها پاسۆردێکی بەهێز",
                    "پاسۆرد و کۆدی تایبەت کە بۆ ماوەیەکی کەم دەمێنێتەوە",
                    "پاسۆرد و ناسنامەی بینراو",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Just a strong password",
                    "Password and a temporary special code",
                    "Password and visual identification",
                    "None of these"
                ],
                correctAnswer: 1
            }
        ],
        3: [
            {
                question: "کام لەم ئیمێیلانە زۆرترین مەترسی فیشینگ هەیە؟",
                englishQuestion: "Which of these emails has the highest phishing risk?",
                options: [
                    "ئیمێیلێکی بانکی کە دەڵێت حسابەکەت قەدەغەکراوە و دەبێت خێرا چاکی بکەیتەوە",
                    "ئیمێیلێکی فەرمی لە کۆمپانیایەکی ناسراو بە زمانی پێشکەشکردن",
                    "ئیمێیلێکی کەسی لە هاوڕێیەکی نزیک",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Bank email saying your account is blocked and needs immediate action",
                    "Official email from a known company with promotional language",
                    "Personal email from a close friend",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک ئیمێیلێک دەگات کە دەڵێت خەڵاتێکت بردووەتەوە، پێویستە چی بکەیت؟",
                englishQuestion: "When you receive an email saying you've won a prize, what should you do?",
                options: [
                    "کرتە لەسەر لینکەکە بکە بۆ وەرگرتنی خەڵاتەکە",
                    "ئیمێیلەکە بسڕەوە و پەیوەندی بە خزمەتگوزاری کاستەمەرەوە بکە",
                    "ئیمێیلەکە بڵاو بکەرەوە لەسەر تویتەر",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Click the link to claim the prize",
                    "Delete the email and contact customer service",
                    "Share the email on Twitter",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم نیشانانە ئیمێیلێکی فیشینگ دەناسێنێتەوە؟",
                englishQuestion: "Which of these signs indicates a phishing email?",
                options: [
                    "ناوی نەناسراو یان هەڵەی ڕێنووسی لە ناونیشانی ئیمێیل",
                    "فەرمانێکی خێرا یان هەڕەشەی قەدەغەکردن",
                    "لینکێکی درۆین یان پەڕەیەکی نەناسراو",
                    "هەموویان"
                ],
                englishOptions: [
                    "Unknown name or spelling error in email address",
                    "Urgent command or threat of account suspension",
                    "Deceptive link or unfamiliar webpage",
                    "All of them"
                ],
                correctAnswer: 3
            },
            {
                question: "ئەگەر لینکێکی ساختە کرتە لەسەر بکەیت، پێویستە یەکسەر چی بکەیت؟",
                englishQuestion: "If you click on a fake link, what should you do immediately?",
                options: [
                    "هیچی، هیچ کێشەیەک نییە",
                    "پاسۆردەکانت بگۆڕە و ڕاپۆرت بکە بە بەڕێوەبەری تەکنیکی",
                    "تەنها پاسۆردی ئیمێیلەکەت بگۆڕە",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Nothing, there's no problem",
                    "Change your passwords and report to technical support",
                    "Only change your email password",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ ناسینەوەی لینکی ساختە؟",
                englishQuestion: "What's the best way to identify a fake link?",
                options: [
                    "بینینی ناونیشانی URL پێش کرتەکردن",
                    "بینینی ڕەنگ و دیزاینی پەڕەکە",
                    "پشت بەستن بە ناونیشانی ئیمێیلەکە",
                    "بینینی نیشانەی قەڵەوقە"
                ],
                englishOptions: [
                    "Checking the URL address before clicking",
                    "Looking at the page colors and design",
                    "Relying on the email address",
                    "Looking for lock icons"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک پەیامێک دەگات کە دەڵێت ژمارەی مۆبایلەکەت بگۆڕە بۆ وەرگرتنی خەڵات، پێویستە:",
                englishQuestion: "When you get a message saying to change your phone number to receive a prize, you should:",
                options: [
                    "ژمارەکەت بنێرە فەورا",
                    "پەیامەکە بسڕەوە و ڕاپۆرت بکە بە وەسڵی فەرمی",
                    "پەیامەکە بڵاو بکەرەوە بۆ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Send your number immediately",
                    "Delete the message and report to official channels",
                    "Share the message with your friends",
                    "None of these"
                ],
                correctAnswer: 1
            }
        ],
        4: [
            {
                question: "کاتێک پەیوەندییەک دەگات کە دەڵێت لە بانکەکەتە و دەتەوێت زانیاری کەسی بخوازێت، پێویستە:",
                englishQuestion: "When you receive a call claiming to be from your bank asking for personal information, you should:",
                options: [
                    "زانیاریەکە بدەیتە پێیان چونکە لە بانکەکەتە",
                    "پەیوەندییەکە بسڕیتەوە و بە بانکەکەتەوە بگەڕێیت بە ژمارەی فەرمی",
                    "ژمارەکارتەکەت بدەیتە پێیان بۆ پشتڕاستکردنەوە",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Give them the information because it's your bank",
                    "Hang up and call your bank back using official numbers",
                    "Give them your card number for verification",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم پەیوەندییانە زۆرترین مەترسی فێڵی سەمەرەی هەیە؟",
                englishQuestion: "Which of these calls has the highest risk of being a scam?",
                options: [
                    "پەیوەندی لە کەسێک کە دەڵێت لە خزمەتگوزارییەکەتە و دەتەوێت زانیاری کەسی بخوازێت",
                    "پەیامێک کە دەڵێت براوەی خەڵات بوویتە و دەبێت پارەی ناردن بدەیت",
                    "پەیوەندییەک کە دەڵێت ژمارەی مۆبایلەکەت بگۆڕیت بۆ وەرگرتنی خەڵات",
                    "هەموویان"
                ],
                englishOptions: [
                    "Call from someone claiming to be from your service asking for personal info",
                    "Message saying you won a prize but need to send money first",
                    "Call telling you to change your phone number to receive a prize",
                    "All of them"
                ],
                correctAnswer: 3
            },
            {
                question: "کاتێک پەیامێک دەگات کە دەڵێت ژمارەی مۆبایلەکەت بگۆڕە بۆ وەرگرتنی خەڵات، پێویستە:",
                englishQuestion: "When you get a message saying to change your phone number to receive a prize, you should:",
                options: [
                    "ژمارەکەت بنێرە فەورا",
                    "پەیامەکە بسڕەوە و ڕاپۆرت بکە بە وەسڵی فەرمی",
                    "پەیامەکە بڵاو بکەرەوە بۆ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Send your number immediately",
                    "Delete the message and report to official channels",
                    "Share the message with your friends",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی پەیوەندییەکی سەمەرەیە؟",
                englishQuestion: "Which of these is a sign of a scam call?",
                options: [
                    "فەرمانێکی خێرا یان هەڕەشە",
                    "داوای زانیاری کەسی یان دارایی",
                    "داوای پارەی ناردن بۆ وەرگرتنی خەڵات",
                    "هەموویان"
                ],
                englishOptions: [
                    "Urgent command or threat",
                    "Request for personal or financial information",
                    "Asking for money to be sent to receive a prize",
                    "All of them"
                ],
                correctAnswer: 3
            },
            {
                question: "ئەگەر گومانت هەیە کە پەیوەندییەکی سەمەرەت کردووە، پێویستە چی بکەیت؟",
                englishQuestion: "If you suspect you've received a scam call, what should you do?",
                options: [
                    "هیچی، بەردەوام بە لە ژیانت",
                    "پەیوەندی بە پۆلیس یان دەزگای تایبەت بکە",
                    "تەنها بە هاوڕێکانت بڵێ",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Nothing, continue with your life",
                    "Contact the police or specialized agency",
                    "Just tell your friends",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم ڕەفتارانە پاراستنی باشە لە بەرامبەر فێڵی سەمەرە؟",
                englishQuestion: "Which of these behaviors provides good protection against scams?",
                options: [
                    "نەدانی ژمارەی کارتی بانکی لە پەیوەندییەکی نەناسراو",
                    "پشتڕاستکردنەوەی پەیوەندییەکان لە ڕێگەی کەناڵی فەرمی",
                    "نەگەڕان بە دوای خەڵاتی ساختە",
                    "هەموویان"
                ],
                englishOptions: [
                    "Not giving credit card numbers in unknown calls",
                    "Verifying calls through official channels",
                    "Not pursuing fake prizes",
                    "All of them"
                ],
                correctAnswer: 3
            }
        ],
        5: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی مۆبایل لە ڤایرۆس؟",
                englishQuestion: "What's the best way to protect your mobile from viruses?",
                options: [
                    "کردنەوەی هەموو لینکەکان",
                    "دامەزراندنی بەرنامەی پاراستن لە ڤایرۆس",
                    "پشتگوێخستنی نوێکردنەوەی سیستەم",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Opening all links",
                    "Installing antivirus software",
                    "Ignoring system updates",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کاتێک ئەپێکی نەناسراوی دامەزرێنیت، پێویستە:",
                englishQuestion: "When installing an unknown app, you should:",
                options: [
                    "هەموو مۆڵەتەکانی داوا بکەیت",
                    "تەنها مۆڵەتە پێویستەکان بدەیت",
                    "هیچ مۆڵەتێک نەدەیت",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Request all permissions",
                    "Only give necessary permissions",
                    "Don't give any permissions",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی ئەپێکی ناسەلامەتە؟",
                englishQuestion: "Which of these indicates an unsafe app?",
                options: [
                    "خواستنی مۆڵەتی زۆر بێ پێویست",
                    "خواستنی زانیاری کەسی بێ پێویست",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Requesting too many unnecessary permissions",
                    "Asking for unnecessary personal information",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 2
            },
            {
                question: "پاراستنی تۆڕی WiFi چییە؟",
                englishQuestion: "What is WiFi network protection?",
                options: [
                    "پەیوەندی کردنی بە هەر تۆرێکەوە",
                    "بەکارهێنانی تۆری ئینکریپتکراو و VPN",
                    "کردنەوەی بلوتوس بەردەوام",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Connecting to any network",
                    "Using encrypted networks and VPN",
                    "Keeping Bluetooth always on",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کاتێک مۆبایلەکەت لەدەست دەدەیت، پێویستە:",
                englishQuestion: "When you lose your mobile phone, you should:",
                options: [
                    "هیچی نەکەیت",
                    "پەیوەندی بە خزمەتگوزاری تەلەفۆنەکەوە بکە بۆ قەدەغەکردنی",
                    "چاوەڕوانی ئەوە بکەیت کە کەسێک بیگەڕێنێتەوە",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Do nothing",
                    "Contact your phone service to block it",
                    "Wait for someone to return it",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە ڕێگایەکی باشە بۆ پاراستنی زانیاری لە مۆبایل؟",
                englishQuestion: "What's a good way to protect information on your mobile?",
                options: [
                    "هەڵگرتنی هەموو زانیاریەکان لەسەر مۆبایل",
                    "بەکارهێنانی پاراستنی دوو هەنگاوە",
                    "کردنەوەی هەموو پەیامە نەناسراوەکان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Storing all information on the mobile",
                    "Using two-factor authentication",
                    "Opening all unknown messages",
                    "None of these"
                ],
                correctAnswer: 1
            }
        ],
        6: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی کۆمپیوتەر لە ڤایرۆس؟",
                englishQuestion: "What's the best way to protect your computer from viruses?",
                options: [
                    "دامەزراندنی بەرنامەی پاراستن لە ڤایرۆس",
                    "کردنەوەی هەموو پەیامە ئەلیکترۆنییەکان",
                    "پشتگوێخستنی نوێکردنەوەی سیستەم",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Installing antivirus software",
                    "Opening all emails",
                    "Ignoring system updates",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                question: "دیواری ئاگرین (Firewall) چی کاری دەکات؟",
                englishQuestion: "What does a firewall do?",
                options: [
                    "پاراستنی کۆمپیوتەر لە هێرشەکانی دەرەوە",
                    "پاراستنی کۆمپیوتەر لە گەرمبوون",
                    "پاراستنی کۆمپیوتەر لە باران",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Protecting computer from external attacks",
                    "Protecting computer from overheating",
                    "Protecting computer from rain",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک فایڵێکی نەناسراوی داگریت، پێویستە:",
                englishQuestion: "When you download an unknown file, you should:",
                options: [
                    "یەکسەر بیخەرەوە",
                    "پشکنینی بکە بە بەرنامەی پاراستن لە ڤایرۆس",
                    "بیبەخشە بۆ هاوڕێکانت",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Open it immediately",
                    "Scan it with antivirus software",
                    "Share it with your friends",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی کۆمپیوتەرێکی ڤایرۆسکراوە؟",
                englishQuestion: "Which of these indicates an infected computer?",
                options: [
                    "کارکردنی هێواش",
                    "بڵاوکردنەوەی فایڵ بە شێوەیەکی خۆکار",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Slow performance",
                    "Files spreading automatically",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 2
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی کۆمپیوتەر؟",
                englishQuestion: "What's the best way to protect your computer?",
                options: [
                    "نوێکردنەوەی بەردەوامی سیستەم",
                    "بەکارهێنانی پاسۆردێکی بەهێز",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Regular system updates",
                    "Using a strong password",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 2
            },
            {
                question: "ئەگەر گومانت هەیە کۆمپیوتەرەکەت ڤایرۆسکراوە، پێویستە:",
                englishQuestion: "If you suspect your computer is infected, you should:",
                options: [
                    "هیچی نەکەیت",
                    "پشکنینی بکە بە بەرنامەی پاراستن لە ڤایرۆس",
                    "کۆمپیوتەرەکە بسوتێنە",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Do nothing",
                    "Scan with antivirus software",
                    "Burn the computer",
                    "None of these"
                ],
                correctAnswer: 1
            }
        ],
        7: [
            {
                question: "کام لەمە باشترین ڕێگایە بۆ گەڕان بە سەلامەتی لە ئینتەرنێت؟",
                englishQuestion: "What's the safest way to browse the internet?",
                options: [
                    "کرتەکردن لەسەر هەر لینکێک",
                    "بینینی ناونیشانی URL پێش کرتەکردن",
                    "کردنەوەی هەموو پەیامە نەناسراوەکان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Clicking on any link",
                    "Checking URL address before clicking",
                    "Opening all unknown messages",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەم مووتۆرە گەڕانانە سەلامەتترە؟",
                englishQuestion: "Which of these search engines is safer?",
                options: [
                    "مووتۆری گەڕانی نەناسراو",
                    "Google یان Bing",
                    "هەموویان یەکسانن",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Unknown search engine",
                    "Google or Bing",
                    "They're all the same",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە نیشانەی پەڕەیەکی ساختەیە؟",
                englishQuestion: "Which of these indicates a fake webpage?",
                options: [
                    "ناونیشانی URL هەڵە",
                    "دیزاینی زۆر خراپ",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Incorrect URL address",
                    "Very poor design",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                question: "کاتێک لە کافێت یان شوێنی گشتی ئینتەرنێت بەکاردەهێنیت، پێویستە:",
                englishQuestion: "When using internet in cafes or public places, you should:",
                options: [
                    "هیچی نەکەیت",
                    "لە تۆری VPN بکەیتەوە",
                    "هەموو زانیاریە کەسیەکانت بنوسیتەوە",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Do nothing",
                    "Use a VPN",
                    "Enter all your personal information",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە ڕێگایەکی باشە بۆ پاراستنی نهێنی لەسەر ئینتەرنێت؟",
                englishQuestion: "What's a good way to protect privacy online?",
                options: [
                    "بەکارهێنانی هەموو تۆڕە کۆمەڵایەتییەکان",
                    "بەکارهێنانی پاسۆردێکی هەمان بۆ هەموو خزمەتگوزارییەکان",
                    "بەکارهێنانی پاراستنی دوو هەنگاوە",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Using all social networks",
                    "Using the same password for all services",
                    "Using two-factor authentication",
                    "None of these"
                ],
                correctAnswer: 2
            },
            {
                question: "کاتێک لەسەر ئینتەرنێت زانیاری کەسی دەنێریت، پێویستە:",
                englishQuestion: "When sending personal information online, you should:",
                options: [
                    "دڵنیابیتەوە کە پەڕەکە سەلامەتە",
                    "هەر زانیاریەک بدەیتەوە",
                    "هیچ زانیاریەک مەدە",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Make sure the page is secure",
                    "Give any information",
                    "Don't give any information",
                    "None of these"
                ],
                correctAnswer: 0
            }
        ],
        8: [
            {
                question: "دیواری ئاگرین (Firewall) چییە؟",
                englishQuestion: "What is a firewall?",
                options: [
                    "سیستەمێکە کە پاراستن لە هێرشەکانی تۆڕ دەکات",
                    "ئامرازێکە بۆ پاراستنی کۆمپیوتەر لە گەرمبوون",
                    "بەرنامەیەکە بۆ خاوکردنەوەی فایڵەکان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "System that protects from network attacks",
                    "Tool to protect computer from overheating",
                    "Program to cool down files",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی تۆڕی WiFi ماڵەوە؟",
                englishQuestion: "What's the best way to secure your home WiFi network?",
                options: [
                    "بەکارهێنانی پاسۆردێکی بەهێز و شێوەزاری WPA2",
                    "کردنەوەی تۆڕەکە بەبێ پاسۆرد",
                    "بەکارهێنانی هەمان پاسۆرد بۆ هەموو کەس",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Using a strong password and WPA2 encryption",
                    "Leaving the network open without password",
                    "Using the same password for everyone",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                question: "VPN چی کاری دەکات؟",
                englishQuestion: "What does a VPN do?",
                options: [
                    "پەیوەندی ئینتەرنێتی سەلامەت و نهێنی دروست دەکات",
                    "خێرایی ئینتەرنێت زیاد دەکات",
                    "هیچ کام لەمە",
                    "هەموویان"
                ],
                englishOptions: [
                    "Creates secure and private internet connection",
                    "Increases internet speed",
                    "None of these",
                    "All of them"
                ],
                correctAnswer: 0
            },
            {
                question: "کام لەمە نیشانەی هێرشێکی تۆڕە؟",
                englishQuestion: "Which of these indicates a network attack?",
                options: [
                    "کۆمپیوتەر کاردەکات بە شێوەیەکی نائاسایی",
                    "بەکارهێنانی پەیوەندی ئینتەرنێت زۆر زیاد دەبێت",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Computer behaving abnormally",
                    "Internet connection usage increasing dramatically",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 2
            },
            {
                question: "کاتێک پەیوەندی بە تۆری WiFi گشتی دەکەیت، پێویستە:",
                englishQuestion: "When connecting to public WiFi, you should:",
                options: [
                    "هیچی نەکەیت",
                    "لە VPN بکەیتەوە",
                    "کارە بانکییەکانت ئەنجام بدەیت",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Do nothing",
                    "Use a VPN",
                    "Do your banking activities",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە باشترین ڕێگایە بۆ پاراستنی تۆڕ؟",
                englishQuestion: "What's the best way to protect a network?",
                options: [
                    "نوێکردنەوەی بەردەوامی ڕاوتر و ئامێرەکان",
                    "بەکارهێنانی پاسۆردێکی بەهێز",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Regularly updating router and devices",
                    "Using strong passwords",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 2
            }
        ],
        9: [
            {
                question: "کەمکردنەوەی زانیاری (Data Minimization) چییە؟",
                englishQuestion: "What is data minimization?",
                options: [
                    "کۆکردنەوەی هەموو زانیاریەکان",
                    "تەنها کۆکردنەوەی زانیاری پێویست",
                    "هاوبەشکردنی هەموو زانیاریەکان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Collecting all data",
                    "Only collecting necessary data",
                    "Sharing all data",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کۆنترۆلی دەستگەیشتن چییە؟",
                englishQuestion: "What is access control?",
                options: [
                    "دیاریکردنی ئەو کەسانەی کە دەتوانن بە زانیاریەکان دەست بگەن",
                    "کردنەوەی هەموو زانیاریەکان بۆ هەموو کەس",
                    "هیچ کام لەمە",
                    "هەموویان"
                ],
                englishOptions: [
                    "Determining who can access the information",
                    "Making all data available to everyone",
                    "None of these",
                    "All of them"
                ],
                correctAnswer: 0
            },
            {
                question: "پاراستنی ماوەی زانیاری چییە؟",
                englishQuestion: "What is data retention?",
                options: [
                    "هەڵگرتنی زانیاری بۆ ماوەیەکی نادیار",
                    "سڕینەوەی زانیاری کاتێک پێویست نییە",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Keeping data for an indefinite period",
                    "Deleting data when no longer needed",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کام لەمە ڕێگایەکی باشە بۆ هاوبەشی سەلامەتی زانیاری؟",
                englishQuestion: "What's a good way to share data securely?",
                options: [
                    "ناردنی زانیاری بە ئیمێلی سادە",
                    "بەکارهێنانی شێوەزارکردن و کانگای سەلامەت",
                    "هاوبەشکردنی لەسەر تۆڕی کۆمەڵایەتی",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Sending data via plain email",
                    "Using encryption and secure channels",
                    "Sharing on social networks",
                    "None of these"
                ],
                correctAnswer: 1
            },
            {
                question: "کاتێک زانیاریەکی حیسابدارانە هاوبەش دەکەیت، پێویستە:",
                englishQuestion: "When sharing sensitive information, you should:",
                options: [
                    "دڵنیابیتەوە کە تەنها کەسە پێویستەکان دەستکەوێت",
                    "بڵاوی بکەیتەوە بۆ هەموو کەس",
                    "هیچی نەکەیت",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Ensure only necessary people have access",
                    "Broadcast it to everyone",
                    "Do nothing",
                    "None of these"
                ],
                correctAnswer: 0
            },
            {
                question: "کام لەمە نیشانەی شکاندنی زانیارییە؟",
                englishQuestion: "Which of these indicates a data breach?",
                options: [
                    "ئیمێلێکی نەناسراو دەگات کە داوای زانیاری دەکات",
                    "کەسێکی نەناسراو دەتوانێت بە زانیاریەکان دەست بگات",
                    "هەردووکیان",
                    "هیچ کام لەمە"
                ],
                englishOptions: [
                    "Receiving unknown email asking for information",
                    "Unknown person can access the data",
                    "Both of them",
                    "None of these"
                ],
                correctAnswer: 2
            }
        ],
    };
    const questions = levelQuestions[level] || [];
    const totalQuestions = questions.length;

    const handleAnswer = (selectedAnswer) => {
        const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
        const newScore = isCorrect ? score + 1 : score;
        const newAnswers = [...answers, isCorrect];

        setScore(newScore);
        setAnswers(newAnswers);

        // Check if this was the last question
        if (currentQuestionIndex >= totalQuestions - 1) {
            setShowResults(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    level,
                    score: score + gameScore,
                    correct_answers: score,
                    total_questions: totalQuestions,
                    mark_level_completed: true
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save quiz results');
            }

            const data = await response.json();
            console.log("Quiz saved successfully", data);
            onComplete();
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('هەڵە ڕوویدا لە ناردنی تێستەکە');
        }
    };

    // Debug effect to log state changes
    useEffect(() => {
        console.log('Current state:', {
            currentQuestionIndex,
            score,
            answers,
            showResults,
            totalQuestions
        });
    }, [currentQuestionIndex, score, answers, showResults]);

    if (questions.length === 0) {
        return (
            <div className="quiz-container" dir="rtl">
                <h2>هیچ پرسیارێک بۆ ئەم ئاستە دیاری نەکراوە</h2>
                <button onClick={onComplete} className="quiz-submit">
                    {translations.continue}
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-container" dir="rtl">
            <h2>{translations.quizTitle} - ئاست {level}</h2>

            {!showResults ? (
                <div className="question-container">
                    <h3>{translations.question} {currentQuestionIndex + 1} {translations.of} {totalQuestions}</h3>
                    <p>{questions[currentQuestionIndex].question}</p>
                    <p className="english-translation">{questions[currentQuestionIndex].englishQuestion}</p>
                    <div className="options">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className="quiz-option"
                            >
                                {option}
                                <div className="english-option">{questions[currentQuestionIndex].englishOptions[index]}</div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="results-container">
                    <h3>{translations.results}</h3>
                    <p>{translations.yourScore}: {score} / {totalQuestions}</p>

                    <div className="answers-review">
                        {questions.map((q, index) => (
                            <div key={index} className={`answer ${answers[index] ? 'correct' : 'wrong'}`}>
                                <p>{q.question}</p>
                                <p className="english-translation">{q.englishQuestion}</p>
                                <span>
                                    {answers[index] ? translations.correct : translations.wrong}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button onClick={handleSubmit} className="quiz-submit">
                        {translations.continue}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Quiz;