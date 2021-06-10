import React, {useState} from 'react';
import {Personality, Career} from "../../App";
import {capitalizeSentence} from "./CollegeScreen";

type GraduationProps = {
    name: string,
    personality: Personality,
    career: Career,
    names: {[personality in Personality]: string}
}

const Graduation: React.FC<GraduationProps> = ({
    name, personality, career, names
}) => {
    return (<div  className={"col"}>
        <p>{names[personality]}</p>
        <p>{name}</p>
        <p>Bachelor of Nihilism in {capitalizeSentence(career)}</p>
    </div>);
};

export default Graduation;