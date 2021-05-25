import React, {useState, useEffect} from 'react';
import { Personality, PersonalityScores, Career } from "../App";

const personalities: Personality[] = ['athlete', 'artist', 'programmer', 'politician', 'scientist', 'writer'];

enum Stage {APPLY, COMMIT, CONCENTRATION};

type ApplicationProps = {
    scores: PersonalityScores,
    names: {[personality in Personality]: string},
    setNoCollege: (state: boolean) => void,
    setAcceptedSchools: (schools: Personality[]) => void,
    setStage: (stage: Stage) => void
}
const Application: React.FC<ApplicationProps> = ({
    scores,
    names,
    setNoCollege,
    setAcceptedSchools,
    setStage
}) => {
    const [selectedSchools, setSelectedSchools] = useState<Personality[]>([]);
    const top5: Personality[] = personalities
        .map(person => ({p: person, s: scores[person]}))
        .sort((a, b) => b.s - a.s)
        .map(obj => obj.p).splice(0, 5);

    const changeApplication: (personality: Personality) => void = personality => {
        setSelectedSchools((selectedSchools.includes(personality)) ? selectedSchools.filter(p => p !== personality) : (selectedSchools.length < 3 ? [...selectedSchools, personality] : selectedSchools));
    }

    const sendApplications: () => void = () => {
        const top2: Personality[] = selectedSchools.sort((a, b) => scores[b] - scores[a]).splice(0, 2);
        setAcceptedSchools(top2);
        setStage(Stage.COMMIT);
    }

    return (
        <div id="application" className="">
            <p>Time to apply for colleges! Choose what schools to apply to (pick up to 3):</p>
            <div className="row justify-content-around">
                { top5.map((personality, idx) => (
                    <div className="col-4" key={idx} >
                        <button className={`btn ${selectedSchools.includes(personality) ? 'btn-info' : 'btn-outline-info'}`}
                                onClick={() => changeApplication(personality)}>
                            { names[personality] }
                        </button>
                    </div>
                )) }
            </div>
            <button disabled={selectedSchools.length < 1} className="btn btn-success" onClick={() => sendApplications()}>
                Apply to College!
            </button>
            <button className={'btn btn-secondary'} onClick={() => {setNoCollege(true); setStage(Stage.CONCENTRATION);}}>Pursue a Career Outside of College!</button>
        </div>
    )
}

type CommitmentProps = {
    acceptedSchools: Personality[],
    setPersonality: (personality: Personality) => void,
    names: {[personality in Personality]: string},
    setStage: (stage: Stage) => void
}
const Commitment: React.FC<CommitmentProps> = ({
    acceptedSchools,
    setPersonality,
    names,
    setStage
}) => {
    const [decision, setDecision] = useState<Personality | null>(null);
    return (
        <div className="" id="commitment">
            <p>You've been accepted to the following schools! Choose one to commit to:</p>
            <div className="justify-content-between">
                { acceptedSchools.map((school, idx) => (
                    <div key={idx}>
                        <button className={`btn ${decision === school ? 'btn-info' : 'btn-outline-info'}`}
                                onClick={() => setDecision(school)}>{names[school]}</button>
                    </div> ))}
            </div>
            <button disabled={!decision} className="btn btn-success" onClick={() => {if (decision) setPersonality(decision); setStage(Stage.CONCENTRATION)}}>
                Commit to College!
            </button>
        </div>
    )
}


type ConcentrationProps = {
    personality: Personality,
    concentrations: {[personality in Personality]: Career[]},
    setCareer: (career: Career) => void,
    advance: () => void
}

const Concentration: React.FC<ConcentrationProps> =
    ({personality, concentrations, setCareer, advance}) => {

        const [selectedCareer, setSelectedCareer] = useState<Career>(null);
        return (<div>
            <p>Select your concentration for your degree!</p>
            <div className={'justify-content-between'}>{concentrations[personality].map((concentration, idx) =>
                <button className={`btn ${selectedCareer === concentration ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => {setSelectedCareer(concentration);}}>{concentration}</button>)}</div>
            <button className={'btn btn-info'} disabled={!selectedCareer} onClick={advance}>Onward!</button>

        </div>)
    }

type CollegeScreenProps = {
    advance: () => void,
    personality: Personality | null,
    setPersonality: (personality: Personality) => void,
    setCareer: (career: Career) => void,
    scores: PersonalityScores,
    decision: {
        names: {[personality in Personality]: string},
        concentrations: {[personality in Personality]: Career[]}
    },
}

const CollegeScreen: React.FC<CollegeScreenProps> = ({
    advance,
    personality,
    setPersonality,
    setCareer,
    scores,
    decision: {names, concentrations}
}) => {
    const [stage, setStage] = useState<Stage>(Stage.APPLY);
    const [acceptedSchools, setAcceptedSchools] = useState<Personality[]>([]);
    const [noCollege, setNoCollege] = useState<boolean>(false);

    return (
        <div className="container text-center">
            { stage === Stage.APPLY && <Application scores={scores} names={names}  setStage={setStage} setAcceptedSchools={setAcceptedSchools} setNoCollege={setNoCollege}/> }
            { stage === Stage.COMMIT && <Commitment acceptedSchools={acceptedSchools} setPersonality={setPersonality} names={names} setStage={setStage} /> }
            { // @ts-ignore
                stage === Stage.CONCENTRATION && <Concentration personality={personality} concentrations={concentrations} setCareer={setCareer} advance={advance}/>}
        </div>
    );
};

export default CollegeScreen;
