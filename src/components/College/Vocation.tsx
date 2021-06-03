import React, {useState} from 'react';
import { Personality, Career } from "../../App";
import { Stage, capitalizeSentence } from "./CollegeScreen";

type VocationProps = {
    personality: Personality,
    careers: {[personality in Personality]: {true: Career[], false: Career[]}},
    setCareer: (career: Career) => void,
    advance: () => void,
    setStage: (stage: Stage) => void
}

const Vocation: React.FC<VocationProps> = ({
    personality,
    careers,
    setCareer,
    advance,
    setStage
}) => {
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

    return (
        <div>
            <p>So you want to become {(personality === "artist" || personality === "athlete") ? "an" : "a"} {personality}, select your vocation:</p>

            <div className="justify-content-between">
                {careers[personality]["false"].map((career, idx) =>
                    <button key={idx}
                            className={`btn ${selectedCareer === career ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setSelectedCareer(career)}>{capitalizeSentence(career)}</button>
                )}
            </div>
            <button className="btn btn-info" disabled={!selectedCareer} onClick={() => {if (selectedCareer) setCareer(selectedCareer); advance();}}>Onward!</button>
            <p>Is this really you?</p>
            <button className="btn btn-primary" onClick={() => setStage(Stage.PASSION)}>Backsies Button</button>
        </div>
    )
}

export default Vocation;
