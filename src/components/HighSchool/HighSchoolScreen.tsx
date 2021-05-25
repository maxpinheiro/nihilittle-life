import React, {useState} from 'react';
import {Personality} from "../../App";
import Scheduler from "./Scheduler";
import ClubFair from "./ClubFair";

export enum Stage {SCHEDULE, CLUBS};

type HighSchoolScreenProps = {
    advance: () => void,
    addPersonalityScore: (type: Personality, amt: number) => void,
    decisions: [{
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    }, {
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    }],
}


const HighSchoolScreen: React.FC<HighSchoolScreenProps> = ({
   advance,
   addPersonalityScore,
   decisions
}) => {
    const [stage, setStage] = useState<Stage>(Stage.SCHEDULE);

    return (
        <div className="container text-center" id="high-school">
            { stage === Stage.SCHEDULE ?
                <Scheduler addPersonalityScore={addPersonalityScore} setStage={setStage} decision={decisions[0]}/>
                : <ClubFair addPersonalityScore={addPersonalityScore} decisions={decisions} advance={advance} />
            }
        </div>
    )
}

export default HighSchoolScreen;
