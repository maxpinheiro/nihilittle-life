import React, {useState} from 'react';
import {Personality} from "../../App";
import Recess from "./Recess";
import PetSelect from "./PetSelect";

export enum Stage {RECESS, PET};

type GradeSchoolScreenProps = {
    advance: () => void,
    addPersonalityScore: (type: Personality, amt: number) => void,
    setPetIdx: (pet: number) => void,
    petIdx: number,
    decision: {
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    },
    pets: string[]
}

const GradeSchoolScreen: React.FC<GradeSchoolScreenProps> = ({
    advance,
    addPersonalityScore,
    setPetIdx,
    petIdx,
    decision: {points, prompt, choices}
}) => {
    const [stage, setStage] = useState<Stage>(Stage.RECESS);

    return (
        <div className="container text-center" id="grade-school">
            { stage === Stage.RECESS ?
                <Recess addPersonalityScore={addPersonalityScore} prompt={prompt} choices={choices} points={points} setStage={(stage) => setStage(stage)}/> :
                <PetSelect petIdx={petIdx} setPetIdx={setPetIdx} advance={advance} />
            }
        </div>
    );
}

export default GradeSchoolScreen;
