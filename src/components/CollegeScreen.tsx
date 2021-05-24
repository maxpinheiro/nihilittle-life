import React, {useState} from 'react';
import {Personality} from "../App";
import {career} from "../App";
import {PersonalityScores} from "../App";

enum Stage {APPLY, CONCENTRATION};

type CollegeScreenProps = {
    advance: () => void,
    setCareer: (career: career) => void,
    scores: PersonalityScores
}

const CollegeScreen: React.FC<CollegeScreenProps> = ({advance, setCareer, scores}) => {
    const [stage, setStage] = useState<Stage>(Stage.APPLY);

    return (
        <div>

        </div>
    );
};

export default CollegeScreen;
