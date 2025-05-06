import React from 'react';
import '../assets/styles/Contact.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaInstagram } from 'react-icons/fa';
import {useLanguage} from "../LanguageContext.jsx";
const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };
    const {translations, language} = useLanguage();
    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-title">
                    <h2>{translations[language].contactTitle}</h2>
                    <p>{translations[language].contactSubtitle}</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <FaEnvelope />
                            </div>
                            <div className="contact-text">
                                <h3>{translations[language].emailTitle}</h3>
                                <p>rezhwan.bestoonf21@komar.edu.iq</p>
                                <p>Muhamad.saleemf19@komar.edu.iq</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <FaPhone />
                            </div>
                            <div className="contact-text" dir="ltr">
                                <h3>{translations[language].phoneTitle}</h3>
                                <p>+964 771 968 6591</p>
                                <p>+964 771 561 6007</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <div className="contact-text">
                                <h3>{translations[language].addressTitle}</h3>
                                <p>سلێمانی، زانکۆی کۆمار</p>
                            </div>
                        </div>

                        <div className="social-media">
                            <h3>{translations[language].socialMediaTitle}</h3>
                            <div className="social-icons">
                                <a href="https://www.facebook.com/rezhwan.beston.7" className="social-icon" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                                <a href="https://www.instagram.com/7ama.salim/" className="social-icon" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form">
                        <form id="contactForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">{translations[language].formName}</label>
                                <input type="text" id="name" placeholder={translations[language].fullName} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">{translations[language].formEmail}</label>
                                <input type="email" id="email" placeholder={translations[language].yourEmail} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">{translations[language].formSubject}</label>
                                <input type="text" id="subject" placeholder={translations[language].yourSubject} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">{translations[language].formMessage}</label>
                                <textarea id="message" rows="5" placeholder={translations[language].writeYourMessage} required></textarea>
                            </div>

                            <button type="submit" className="btn">{translations[language].formSubmit}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;