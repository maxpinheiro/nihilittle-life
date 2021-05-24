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
        <div className="btn" onClick={setPetIdx} style={{backgroundColor: 'mediumaquamarine', border: selected ? 'solid 2px darkgreen' : ''}}>
            <img src={`/nihilittle-life/media/pets/${idx + 1}.png`} alt=""/>
            <p>{petLabels[idx]}</p>
        </div>
    )
}

type RecessProps = {
    choices: [{ type: Personality, decision: string }],
    addPersonalityScore: (type: Personality, amt: number) => void,
    points: number,
    setStage: (stage: Stage) => void
}

const Recess: React.FC<RecessProps> = ({
    choices,
    addPersonalityScore,
    points,
    setStage
}) => {
    return (
        <div id="recess">
            <p>{prompt}</p>
            <div>
                { choices.map(({type, decision}) => (
                    <button className="btn btn-success"
                            onClick={() => { addPersonalityScore(type, points); setStage(Stage.PET); }}
                    >{decision}</button>
                )) }
            </div>
        </div>
    )
}

type PetSelectProps = {
    petIdx: number,
    setPetIdx: (pet: number) => void,
    advance: () => void,
}

const PetSelect: React.FC<PetSelectProps> = ({
    petIdx,
    setPetIdx,
    advance
}) => {
    const [petSelected, setPetSelected] = useState<boolean>(false);

    return (
        <div id="pet-select">
            <p>You're playing M.A.S.H. - what pet do you end up with?</p>
            <div>
                {Array(5).fill("").map((_, idx) => (
                    <PetIcon
                        setPetIdx={() => {
                            setPetIdx(idx);
                            setPetSelected(true);
                        }}
                        idx={idx} selected={petIdx === idx}
                    />
                ))}
            </div>
            { petSelected && <button className="btn btn-primary" onClick={advance}>Onward!</button> }
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
    const [stage, setStage] = useState<Stage>(Stage.RECESS);

    return (
        <div className="container text-center" id="grade-school">
            { stage === Stage.RECESS ?
                <Recess addPersonalityScore={addPersonalityScore} choices={choices} points={points} setStage={(stage) => setStage(stage)}/> :
                <PetSelect petIdx={petIdx} setPetIdx={setPetIdx} advance={advance} />
            }
        </div>
    );
}

export default GradeSchoolScreen;
