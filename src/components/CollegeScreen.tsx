import React, {useState} from 'react';
import {Personality} from "../App";
import {career} from "../App";
import {PersonalityScores} from "../App";

enum Stage {APPLY, CONCENTRATION};

type CollegeScreenProps = {
    setCareer: (career: career) => void,
    scores: PersonalityScores,
    advanceStage: () => void
}

const CollegeScreen: React.FC<CollegeScreenProps> = ({setCareer, scores, advanceStage}) => {
    return (<div></div>);
};