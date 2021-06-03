import React, {useState} from 'react';
import {Personality} from "../../App";

type ClubFairProps = {
    addPersonalityScore: (type: Personality, amt: number) => void,
    decisions: [{
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    }, {
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    }],
    advance: () => void
}

const ClubFair: React.FC<ClubFairProps> = ({
    addPersonalityScore,
    decisions,
    advance
}) => {
    const [selectedType, setSelectedType] = useState<Personality | null>(null);

    return (
        <div id="club-fair">
            <p>Welcome to the club fair! Choose your extracurricular:</p>
            <div>
                { decisions[1].choices.map(({type, decision}, idx) => (
                    <button className={`btn ${type === selectedType ? 'btn-info' : 'btn-outline-info'}`} key={idx} onClick={() => setSelectedType(type)}>{decision}</button>
                ))}
            </div>
            {
                <button disabled={!selectedType} className="btn btn-primary" onClick={()=> { if (selectedType) addPersonalityScore(selectedType, decisions[1].points); advance();}}>Let's Go!</button>
            }
        </div>
    )
}

export default ClubFair;
