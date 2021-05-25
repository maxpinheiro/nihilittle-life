import React, {useState} from 'react';
import { personalities, Personality, PersonalityScores, Career } from "../App";

enum Stage {APPLY, COMMIT, PASSION, CONCENTRATION, VOCATION};

type ApplicationProps = {
    scores: PersonalityScores,
    names: {[personality in Personality]: string},
    setCollege: (state: boolean) => void,
    setAcceptedSchools: (schools: Personality[]) => void,
    setStage: (stage: Stage) => void
}
const Application: React.FC<ApplicationProps> = ({
    scores,
    names,
    setCollege,
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
            <button disabled={selectedSchools.length < 1} className="btn btn-success" onClick={() => sendApplications()}>Apply to College!</button>
            <div><button className="btn btn-secondary" onClick={() => {setCollege(false); setStage(Stage.PASSION);}}>Pursue a Career Outside of College!</button></div>

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

const capitalizeSentence: (str: string) => string = (str) => {
    return str.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(' ');
}

type ConcentrationProps = {
    personality: Personality,
    careers: {[personality in Personality]: {true: Career[], false: Career[]}},
    setCareer: (career: Career) => void,
    advance: () => void,
}

const Concentration: React.FC<ConcentrationProps> = ({
    personality,
    careers,
    setCareer,
    advance,
}) => {
        const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

        return (
            <div>
                <p>Select your concentration for your degree!</p>
                    <div className="justify-content-between">
                        {careers[personality]["true"].map((career, idx) =>
                            <button key={idx}
                                className={`btn ${selectedCareer === career ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => setSelectedCareer(career)}>{capitalizeSentence(career)}</button>
                        )}
                    </div>
                <button className="btn btn-info" disabled={!selectedCareer} onClick={() => {if (selectedCareer) setCareer(selectedCareer); advance();}}>Onward!</button>
            </div>
        )
    }

type VocationProps = {
    personality: Personality,
    careers: {[personality in Personality]: {true: Career[], false: Career[]}},
    setCareer: (career: Career) => void,
    advance: () => void,
    setStage: (stage: Stage) => void
}

const Vocation: React.FC<VocationProps> = ({
                                                         personality,
                                                         careers,
                                                         setCareer,
                                                         advance,
                                                         setStage
                                                     }) => {
    const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

    return (
        <div>
            <p>So you want to become {(personality === "artist" || personality === "athlete") ? "an" : "a"} {personality}, select your vocation:</p>

            <div className="justify-content-between">
                {careers[personality]["false"].map((career, idx) =>
                    <button key={idx}
                            className={`btn ${selectedCareer === career ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setSelectedCareer(career)}>{capitalizeSentence(career)}</button>
                )}
            </div>
            <button className="btn btn-info" disabled={!selectedCareer} onClick={() => {if (selectedCareer) setCareer(selectedCareer); advance();}}>Onward!</button>
            <p>Is this really you?</p>
            <button className="btn btn-primary" onClick={() => setStage(Stage.PASSION)}>Backsies Button</button>
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
        careers: {[personality in Personality]: {true: Career[], false: Career[]}}
    },
}

const CollegeScreen: React.FC<CollegeScreenProps> = ({
    advance,
    personality,
    setPersonality,
    setCareer,
    scores,
    decision: {names, careers}
}) => {
    const [stage, setStage] = useState<Stage>(Stage.APPLY);
    const [acceptedSchools, setAcceptedSchools] = useState<Personality[]>([]);
    const [college, setCollege] = useState<boolean>(true);

    return (
        <div className="container text-center">
            { stage === Stage.APPLY && <Application scores={scores} names={names}  setStage={setStage} setAcceptedSchools={setAcceptedSchools} setCollege={setCollege} /> }
            { stage === Stage.COMMIT && <Commitment acceptedSchools={acceptedSchools} setPersonality={setPersonality} names={names} setStage={setStage} /> }
            { stage === Stage.PASSION && <Passion setPersonality={setPersonality} setStage={setStage}/>}
            { stage === Stage.CONCENTRATION && personality && <Concentration personality={personality} careers={careers} setCareer={setCareer} advance={advance} /> }
            { stage === Stage.VOCATION && personality && <Vocation personality={personality} careers={careers} setCareer={setCareer} advance={advance} setStage={setStage}/>}
        </div>
    );
};

export default CollegeScreen;
