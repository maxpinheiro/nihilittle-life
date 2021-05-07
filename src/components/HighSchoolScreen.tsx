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
    const [unselectedCourses, setUnselectedCourses] = useState<number[]>
    (decision.choices.map((_, idx) => idx));
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
        <div>
            <p>{decision.prompt}</p>
            <div id="unselected-courses">
                {Array(6).fill("").map((_, idx) => (
                    unselectedCourses.includes(idx) &&
                  <button onClick={() => {addCourse(idx)}}>{decision.choices[idx].decision}</button>
                ))}
            </div>
            <div id="selected-schedule">
                {selectedCourses.map((idx) =>
                    <button onClick={() => {removeCourse(idx)}}>{decision.choices[idx].decision}</button>
                )}
            </div>
            {selectedCourses.length === 3 &&
            <button onClick={() =>
            {selectedCourses.map(idx => addPersonalityScore(decision.choices[idx].type, decision.points)); advanceStage();}}>
                Confirm Schedule</button>}
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
    return (
        <div>{
            stage === Stage.SCHEDULE ?
                <Scheduler  addPersonalityScore={addPersonalityScore} advanceStage={() => setStage(Stage.CLUBS)}
                            decision={decisions[0]}/>
                : <div></div>

        }
        </div>
    )
}

export default HighSchoolScreen;