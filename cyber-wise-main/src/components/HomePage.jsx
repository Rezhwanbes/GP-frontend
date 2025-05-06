import Hero from "./Hero.jsx";
import GameChapters from "./GamesChapters.jsx";
import QuizPoints from "./QuizePoints.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import React from "react";

const HomePage = () => {
    return(
        <>
            <Hero />
            <GameChapters />
            <QuizPoints />
            <About />
            <Contact />
            <Footer />
        </>
    )
}
export default HomePage;