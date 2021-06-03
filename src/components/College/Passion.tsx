import React, {useState} from 'react';
import { personalities, Personality } from "../../App";
import { Stage } from "./CollegeScreen";

type PassionProps = {
    setPersonality: (personality: Personality) => void,
    setStage: (stage: Stage) => void
}
const Passion: React.FC<PassionProps> = ({
    setPersonality,
    setStage
}) => {
    const [decision, setDecision] = useState<Personality | null>(null);
    return (
        <div className="" id="commitment">
            <p>What career interests you?</p>
            <div className="justify-content-between">
                { personalities.map((personality, idx) => (
                    <div key={idx}>
                        <button className={`btn ${decision === personality ? 'btn-info' : 'btn-outline-info'}`}
                                onClick={() => setDecision(personality)}>{personality}</button>
                    </div> ))}
            </div>
            <button disabled={!decision} className="btn btn-success" onClick={() => {if (decision) setPersonality(decision); setStage(Stage.VOCATION)}}>
                See where this passion takes you!
            </button>
        </div>
    )
}

export default Passion;
