import React, {useState} from 'react';
import { Personality, PersonalityScores } from "../../App";
import { Career } from '../../CAREERS';
import Application from "./Application";
import Commitment from "./Commitment";
import Passion from "./Passion";
import Concentration from "./Concentration";
import Vocation from "./Vocation";


import Graduation from "./Graduation";

export enum Stage {APPLY, COMMIT, PASSION, CONCENTRATION, VOCATION, GRADUATION};

export const capitalizeSentence: (str: string) => string = (str) => {
    return str.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(' ');
}

type CollegeScreenProps = {
    name : string,
    advance: () => void,
    personality: Personality | null,
    setPersonality: (personality: Personality) => void,
    setCareer: (career: Career) => void,
    scores: PersonalityScores,
    collegeDecision: {
        names: {[personality in Personality]: string},
    },
    careerDecision : {
        careers: {[personality in Personality]: {true: Career[], false: Career[]}},
    }
}

const CollegeScreen: React.FC<CollegeScreenProps> = ({
    name,
    advance,
    personality,
    setPersonality,
    setCareer,
    scores,
    collegeDecision: {names},
    careerDecision: {careers}
}) => {
    const [stage, setStage] = useState<Stage>(Stage.APPLY);
    const [acceptedSchools, setAcceptedSchools] = useState<Personality[]>([]);
    const [college, setCollege] = useState<boolean>(true);
    const [career, setCareerState] = useState<Career | null>(null);


    return (
        <div className="container text-center">
            { stage === Stage.APPLY && <Application scores={scores} names={names}  setStage={setStage} setAcceptedSchools={setAcceptedSchools} setCollege={setCollege} /> }
            { stage === Stage.COMMIT && <Commitment acceptedSchools={acceptedSchools} setPersonality={setPersonality} names={names} setStage={setStage} /> }
            { stage === Stage.PASSION && <Passion setPersonality={setPersonality} setStage={setStage}/>}
            { stage === Stage.CONCENTRATION && personality && <Concentration personality={personality} careers={careers} setCareer={setCareer} advance={advance}  setStage={setStage} setCareerState={setCareerState}/> }
            { stage === Stage.VOCATION && personality && <Vocation personality={personality} careers={careers} setCareer={setCareer} advance={advance} setStage={setStage}/>}
            { stage === Stage.GRADUATION && personality && career && <Graduation name={name} personality={personality} career={career} names={names}/>}
        </div>
    );
};

export default CollegeScreen;
