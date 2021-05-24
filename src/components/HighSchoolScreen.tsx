import React, {useState} from 'react';
import {Personality} from "../App";

enum Stage {SCHEDULE, CLUBS};

type SchedulerProps = {
    addPersonalityScore: (type: Personality, amt: number) => void,
    decision: {
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    },
    advanceStage: () => void
}

const Scheduler: React.FC<SchedulerProps> = ({
addPersonalityScore,
decision,
advanceStage
}) => {
    const [unselectedCourses, setUnselectedCourses] = useState<number[]>(decision.choices.map((_, idx) => idx));
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const addCourse = (idx: number) => {
        setUnselectedCourses(unselectedCourses.filter( course => course !== idx));
        setSelectedCourses([... selectedCourses, idx]);
    }

    const removeCourse = (idx: number) => {
        setUnselectedCourses([... unselectedCourses, idx]);
        setSelectedCourses(selectedCourses.filter(course => course !== idx));
    }

    return (
        <div className="container text-center" id="scheduler">
            <p>{decision.prompt}</p>
            <div className="row justify-content-around">
                <div id="unselected-courses" className="col d-flex flex-column">
                    {Array(6).fill("").map((_, idx) => (
                        <button className={`${selectedCourses.includes(idx) && 'invisible' } btn btn-info`}
                            onClick={() => {if (selectedCourses.length < 3) addCourse(idx)}}>{decision.choices[idx].decision}</button>
                    ))}
                </div>
                <div id="selected-schedule"  className="col d-flex flex-column">
                    {selectedCourses.map((idx) =>
                        <button className="btn btn-success" onClick={() => {removeCourse(idx)}}>{decision.choices[idx].decision}</button>
                    )}
                </div>
            </div>
            <button disabled={selectedCourses.length < 3} className="btn btn-secondary"
                    onClick={() => {selectedCourses.map(idx => addPersonalityScore(decision.choices[idx].type, decision.points)); advanceStage();}}>
                Confirm Schedule
            </button>
        </div>
    )
}

type ClubFairProps = {
    addPersonalityScore: (type: Personality, amt: number) => void,
    decisions: [{
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    }],
    setSelected: (selected: boolean) => void
}

const ClubFair: React.FC<ClubFairProps> = ({
    addPersonalityScore,
    decisions,
    setSelected
}) => {
    return (
        <div id="club-fair">
            <p>Welcome to the club fair! Choose your extracurricular:</p>
            {// @ts-ignore
                decisions[1].choices.map(({type, decision}) => (
                    // @ts-ignore
                    <button className="btn btn-info" onClick={()=> {addPersonalityScore(type, decisions[1].points); setSelected(true);}}>{decision}</button>
                ))}
        </div>
    )
}


type HighSchoolScreenProps = {
    advance: () => void,
    addPersonalityScore: (type: Personality, amt: number) => void,
    decisions: [{
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
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <div className="container text-center" id="high-school">
            { stage === Stage.SCHEDULE ?
                <Scheduler  addPersonalityScore={addPersonalityScore} advanceStage={() => setStage(Stage.CLUBS)}
                            decision={decisions[0]}/>
                : <ClubFair addPersonalityScore={addPersonalityScore} decisions={decisions} setSelected={(selected) => setSelected(selected)} />
            }
            { selected && <button className="btn btn-primary" onClick={advance}>Let's Go!</button> }
        </div>
    )
}

export default HighSchoolScreen;
