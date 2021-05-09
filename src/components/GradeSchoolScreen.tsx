import React, {useState} from 'react';
import {Personality} from "../App";

type PetProps = {
    setPetIdx: () => void,
    idx: number,
    selected: boolean
}

const petLabels: string[] = ['fish', 'cat', 'dog', 'guinea pig', 'snake'];
const PetIcon: React.FC<PetProps> = ({
    setPetIdx,
    idx,
    selected
}) => {
    return (
        <div onClick={setPetIdx} style={{backgroundColor: 'cyan', border: selected ? 'solid 2px darkgreen' : ''}}>
            <img src={`/nihilittle-life/media/pets/${idx + 1}.png`} alt=""/>
            <p>{petLabels[idx]}</p>
        </div>
    )
}

enum Stage {RECESS, PET};

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
    const [petSelected, setPetSelected] = useState<boolean>(false);
    const [stage, setStage] = useState<Stage>(Stage.RECESS);

    return (
        <div>
            {stage === Stage.RECESS ?
                <div>
                    <p>{prompt}</p>
                    {choices.map(({type, decision}) => (
                        <button onClick={() => {
                            addPersonalityScore(type, points);
                            setStage(Stage.PET);
                        }}>{decision}</button>
                    ))}
                </div> :

                <div id="pet-row">
                    <p>You're playing M.A.S.H. - what pet do you end up with?</p>
                    {Array(5).fill("").map((_, idx) => (
                        <PetIcon
                            setPetIdx={() => {
                                setPetIdx(idx);
                                setPetSelected(true);
                            }}
                            idx={idx} selected={petIdx === idx}
                        />
                    ))}
                    { petSelected && <button onClick={advance}>Onward!</button>}
                </div>
            }
        </div>
    );
}

export default GradeSchoolScreen;