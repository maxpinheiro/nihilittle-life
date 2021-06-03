import React, {useState} from 'react';
import { personalities, Personality, PersonalityScores, Career } from "../../App";
import Application from "./Application";
import Commitment from "./Commitment";
import Passion from "./Passion";
import Concentration from "./Concentration";
import Vocation from "./Vocation";

export enum Stage {APPLY, COMMIT, PASSION, CONCENTRATION, VOCATION};

export const capitalizeSentence: (str: string) => string = (str) => {
    return str.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()).join(' ');
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
