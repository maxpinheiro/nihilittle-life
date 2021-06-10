import React, {useState} from 'react';
import {Career, Personality} from "../../App";
import {capitalizeSentence, Stage} from "./CollegeScreen";

type ConcentrationProps = {
    personality: Personality,
    careers: {[personality in Personality]: {true: Career[], false: Career[]}},
    setCareer: (career: Career) => void,
    setCareerState: (career: null | "professional athleticism" | "physical therapy" | "athletic training" | "coaching" | "personal training" | "graphic design" | "fine arts" | "art history" | "public art" | "glass blowing" | "cybersecurity" | "artificial intelligence" | "web development" | "software engineering" | "I.T." | "hacking" | "social justice" | "political theory" | "international relations" | "city council" | "charity administration" | "motivational speaking" | "biology" | "physics" | "electrical work" | "chemistry" | "engineering" | "pharmacology" | "drug production" | "creative writing" | "journalism" | "poetry" | "magazine editing" | "copywriting" | "sports officiating") => void,
    advance: () => void,
    setStage: (stage: Stage) => void
}

const Concentration: React.FC<ConcentrationProps> = ({
    personality,
    careers,
    setCareer,
    setCareerState,
    advance,
    setStage
}) => {
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

    return (
        <div>
            <p>Select your concentration for your degree!</p>
            <div className="justify-content-between">
                {careers[personality]["true"].map((career, idx) =>
                    <button key={idx}
                            className={`btn ${selectedCareer === career ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setSelectedCareer(career)}>{capitalizeSentence(career)}</button>
                )}
            </div>
            <button className="btn btn-info" disabled={!selectedCareer} onClick={() => {if (selectedCareer) setCareer(selectedCareer); setCareerState(selectedCareer); setStage(Stage.GRADUATION);}}>Onward!</button>
        </div>
    )
}

export default Concentration;
