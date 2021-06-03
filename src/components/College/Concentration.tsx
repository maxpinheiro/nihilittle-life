import React, {useState} from 'react';
import { Personality, Career } from "../../App";
import { capitalizeSentence } from "./CollegeScreen";

type ConcentrationProps = {
    personality: Personality,
    careers: {[personality in Personality]: {true: Career[], false: Career[]}},
    setCareer: (career: Career) => void,
    advance: () => void,
}

const Concentration: React.FC<ConcentrationProps> = ({
    personality,
    careers,
    setCareer,
    advance,
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
            <button className="btn btn-info" disabled={!selectedCareer} onClick={() => {if (selectedCareer) setCareer(selectedCareer); advance();}}>Onward!</button>
        </div>
    )
}

export default Concentration;
