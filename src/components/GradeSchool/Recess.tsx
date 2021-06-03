import React, {useState} from 'react';
import {Personality} from "../../App";
import {Stage} from './GradeSchoolScreen';

type RecessProps = {
    prompt: string,
    choices: [{ type: Personality, decision: string }],
    addPersonalityScore: (type: Personality, amt: number) => void,
    points: number,
    setStage: (stage: Stage) => void
}

const Recess: React.FC<RecessProps> = ({
    prompt,
    choices,
    addPersonalityScore,
    points,
    setStage
}) => {
    const [decType, setType] = useState<Personality | null>(null);

    return (
        <div id="recess">
            <p>{prompt}</p>
            <div>
                { choices.map(({type, decision}, idx) => (
                    <button className={`btn ${type === decType ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setType(type)} key={idx}>{decision}</button>
                ))}
            </div>
            { <button disabled={!decType} className="btn btn-info" onClick={() => {decType && addPersonalityScore(decType, points); setStage(Stage.PET);}}>Onward!</button>}
        </div>
    )
}

export default Recess;
