import React, {useState, useEffect} from 'react';
import { Personality, PersonalityScores, Career } from "../App";

const personalities: Personality[] = ['athlete', 'artist', 'programmer', 'politician', 'scientist', 'writer'];

enum Stage {APPLY, COMMIT, CONCENTRATION};

type ApplicationProps = {
    scores: PersonalityScores,
    names: {[personality in Personality]: string},
    setAcceptedSchools: (schools: Personality[]) => void,
    setStage: (stage: Stage) => void
}
const Application: React.FC<ApplicationProps> = ({
    scores,
    names,
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

type CollegeScreenProps = {
    advance: () => void,
    personality: Personality | null,
    setPersonality: (personality: Personality) => void,
    setCareer: (career: Career) => void,
    scores: PersonalityScores,
    decision: {
        names: {[personality in Personality]: string},
        concentrations: {[personality in Personality]: string[]}
    },
}

const CollegeScreen: React.FC<CollegeScreenProps> = ({
    advance,
    setPersonality,
    setCareer,
    scores,
    decision: {names, concentrations}
}) => {
    const [stage, setStage] = useState<Stage>(Stage.APPLY);
    const [acceptedSchools, setAcceptedSchools] = useState<Personality[]>([]);

    return (
        <div className="container text-center">
            { stage === Stage.APPLY && <Application scores={scores} names={names}  setStage={setStage} setAcceptedSchools={setAcceptedSchools}/> }
            { stage === Stage.COMMIT && <Commitment acceptedSchools={acceptedSchools} setPersonality={setPersonality} names={names} setStage={setStage} /> }
        </div>
    );
};

export default CollegeScreen;
