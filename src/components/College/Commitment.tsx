import React, {useState} from 'react';
import { Personality } from "../../App";
import { Stage } from "./CollegeScreen";

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
            <div><button className="btn btn-secondary" onClick={() => {setStage(Stage.PASSION);}}>Pursue a Career Outside of College!</button></div>
        </div>
    )
}

export default Commitment;
