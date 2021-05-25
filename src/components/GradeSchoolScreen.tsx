import React, {useState} from 'react';
import {Personality} from "../App";

enum Stage {RECESS, PET};

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
        <div className={`btn ${selected ? 'btn-info' : 'btn-outline-info'}`} onClick={setPetIdx} >
            <img src={`/nihilittle-life/media/pets/${idx + 1}.png`} alt=""/>
            <p>{petLabels[idx]}</p>
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
                        idx={idx} key={idx} selected={petIdx === idx}
                    />
                ))}
            </div>
            { <button disabled={!petSelected} className="btn btn-primary" onClick={advance}>Onward!</button> }
        </div>
    )
}

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
