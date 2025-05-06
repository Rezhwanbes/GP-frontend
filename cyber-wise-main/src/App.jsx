import React from 'react';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import {LanguageProvider} from "./LanguageContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import './App.css';

import PhishingDefenseGame from "./components/levels/phishing-defense/PhishingDefenseGame.jsx";
import SocialMedia from "./components/levels/social-media/SocialMedia.jsx";
import PasswordMaster from "./components/levels/PasswordMaster.jsx";
import ScamPrevention from "./components/levels/scam-prevention/ScamPrevention.jsx";
import PhoneProtection from "./components/levels/phone-protection/PhoneProtection.jsx";
import ComputerProtection from "./components/levels/computer-protection/ComputerProtection.jsx";
import SafeOnlineSearch from "./components/levels/safe-online-search/SafeOnlineSearch.jsx";
import NetworkProtection from "./components/levels/network-protection/NetworkProtection.jsx";
import DataProtection from "./components/levels/data-protection/DataProtection.jsx";
import DataMaster from "./components/levels/data-master/DataMaster.jsx";
function App() {
    const [showLoginModal, setShowLoginModal] = React.useState(false);
    const [showSignupModal, setShowSignupModal] = React.useState(false);

    return (
        <LanguageProvider>
        <AuthProvider>
            <Router>
                <div className="app" dir="rtl" lang="ku-iq">
                    <Header
                        onLoginClick={() => setShowLoginModal(true)}
                        onSignupClick={() => setShowSignupModal(true)}
                    />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/password-master" element={<PasswordMaster />} />
                        <Route path="/social-media" element={<SocialMedia />} />
                        <Route path="/phishing-defense-game" element={<PhishingDefenseGame />} />
                        <Route path="/scam-prevention" element={<ScamPrevention />} />
                        <Route path="/phone-protection" element={<PhoneProtection />} />
                        <Route path="/computer-protection" element={<ComputerProtection />} />
                        <Route path="/safe-online-search" element={<SafeOnlineSearch />} />
                        <Route path="/network-protection" element={<NetworkProtection />} />
                        <Route path="/data-protection" element={<DataProtection />} />
                        <Route path="/data-master" element={<DataMaster />} />
                    </Routes>

                    {showLoginModal && (
                        <LoginModal
                            onClose={() => setShowLoginModal(false)}
                            onSignupClick={() => {
                                setShowLoginModal(false);
                                setShowSignupModal(true);
                            }}
                        />
                    )}

                    {showSignupModal && (
                        <SignupModal
                            onClose={() => setShowSignupModal(false)}
                            onLoginClick={() => {
                                setShowSignupModal(false);
                                setShowLoginModal(true);
                            }}
                        />
                    )}
                </div>
            </Router>
        </AuthProvider>
        </LanguageProvider>
    );
}

export default App;