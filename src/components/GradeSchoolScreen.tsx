import React from 'react';
import { Personality } from "../App";

type GradeSchoolScreenProps = {
    advance: () => void,
    addPersonalityScore: (type: Personality, amt: number) => void,
    decision: {
        points: number,
        prompt: string,
        choices: [{type: Personality, decision: string}]
    }
}

const GradeSchoolScreen: React.FC<GradeSchoolScreenProps> = ({
    advance,
    addPersonalityScore,
    decision : {points, prompt, choices}
}) => {
    return (
        <div>
            <p>{prompt}</p>
            {choices.map(({type, decision}) => (
                <button onClick={() => {addPersonalityScore(type, points); advance();}}>{decision}</button>
            ))}
        </div>
    );
}

export default GradeSchoolScreen;