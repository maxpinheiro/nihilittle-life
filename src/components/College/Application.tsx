import React, {useState} from 'react';
import { personalities, Personality, PersonalityScores } from "../../App";
import {Stage} from "./CollegeScreen";

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

export default Application;
