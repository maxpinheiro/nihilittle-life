import React, {useState} from 'react';
import {Personality} from "../../App";
import {Stage} from './HighSchoolScreen';

type SchedulerProps = {
    addPersonalityScore: (type: Personality, amt: number) => void,
    decision: {
        points: number,
        prompt: string,
        choices: [{ type: Personality, decision: string }]
    },
    setStage: (stage: Stage) => void
}

const Scheduler: React.FC<SchedulerProps> = ({
    addPersonalityScore,
    decision,
    setStage
}) => {
    const [unselectedCourses, setUnselectedCourses] = useState<number[]>(decision.choices.map((_, idx) => idx));
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const addCourse = (idx: number) => {
        setUnselectedCourses(unselectedCourses.filter( course => course !== idx));
        setSelectedCourses([...selectedCourses, idx]);
    }

    const removeCourse = (idx: number) => {
        setUnselectedCourses([...unselectedCourses, idx]);
        setSelectedCourses(selectedCourses.filter(course => course !== idx));
    }

    return (
        <div className="container text-center" id="scheduler">
            <p>{decision.prompt}</p>
            <div className="row justify-content-around">
                <div id="unselected-courses" className="col d-flex flex-column">
                    {Array(6).fill("").map((_, idx) => (
                        <button className={`${selectedCourses.includes(idx) && 'invisible' } btn btn-info`} key={idx}
                                onClick={() => {if (selectedCourses.length < 3) addCourse(idx)}}>{decision.choices[idx].decision}</button>
                    ))}
                </div>
                <div id="selected-schedule"  className="col d-flex flex-column">
                    {selectedCourses.map((idx) =>
                        <button className="btn btn-success" key={idx} onClick={() => {removeCourse(idx)}}>{decision.choices[idx].decision}</button>
                    )}
                </div>
            </div>
            <button disabled={selectedCourses.length < 3} className="btn btn-secondary"
                    onClick={() => {selectedCourses.map(idx => addPersonalityScore(decision.choices[idx].type, decision.points)); setStage(Stage.CLUBS);}}>
                Confirm Schedule
            </button>
        </div>
    )
}

export default Scheduler;
