import React from 'react';
import Decisions from "./decisions.json";

import IntroScreen from "./components/IntroScreen";
import SetupScreen from "./components/Setup/SetupScreen";
import GradeSchoolScreen from "./components/GradeSchool/GradeSchoolScreen";
import HighSchoolScreen from "./components/HighSchool/HighSchoolScreen";
import CollegeScreen from "./components/College/CollegeScreen";
import Career1Screen from "./components/Career1/Career1Screen";

enum stage { INTRO, SETUP, GRADE_SCHOOL, HIGH_SCHOOL, COLLEGE, CAREER1, LOVE, CAREER2, RETIREMENT, END_SCENE};
type Age = 'child' | 'adolescent' | 'young_adult' | 'adult' | 'old';
export type Personality = 'athlete' | 'artist' | 'programmer' | 'politician' | 'scientist' | 'writer';
export type PersonalityScores = {[type in Personality]: number};
export type Career =
    | 'professional athleticism' | 'physical therapy' | 'athletic training' | 'coaching' | 'personal training'
    | 'graphic design' | 'fine arts' | 'art history' | 'public art'
    | 'cybersecurity' | 'artificial intelligence' | 'web development' | 'software engineering' | 'I.T.' | 'hacking'
    | 'social justice' | 'political theory' | 'international relations' | 'city council' | 'charity administration'
    | 'biology' | 'physics' | 'electrical work' | 'chemistry' | 'engineering' | 'pharmacology' | 'drug production'
    | 'creative writing' | 'journalism' | 'poetry' | 'magazine editing' | 'copywriting';

export const personalities: Personality[] = ['athlete', 'artist', 'programmer', 'politician', 'scientist', 'writer'];
const INIT_SCORES: PersonalityScores = {
  athlete: 0,
  artist: 0,
  programmer: 0,
  politician: 0,
  scientist: 0,
  writer: 0
}

type State = {
  gameStage: stage,
  player: { idx: number, name: string, age: Age },
  personalityScore: PersonalityScores,
  personality: Personality | null,
  pet: number,
  career: Career | null
}

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      gameStage: stage.INTRO,
      player: { idx: -1, name: '', age: 'child' },
      personalityScore: INIT_SCORES,
      personality: null,
      pet: -1,
      career: null
    };

    this.getScene = this.getScene.bind(this);
    this.setScene = this.setScene.bind(this);
    this.setPetIdx = this.setPetIdx.bind(this);
    this.setPlayerIdx = this.setPlayerIdx.bind(this);
    this.setPlayerName = this.setPlayerName.bind(this);
    this.addPersonalityScore = this.addPersonalityScore.bind(this);
    this.setPersonality = this.setPersonality.bind(this);
    this.setCareer = this.setCareer.bind(this);
  }

  stateString(): string { return `Stage ${this.state.gameStage} | Playing as ${this.state.player.name}, age ${this.state.player.name} | Scores: ${personalities.map((key, idx) => `${key}: ${this.state.personalityScore[key]}${idx < personalities.length && ', '}`)}`}

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<State>, snapshot?: any) {
    // print state beginning of every stage
    if (prevState.gameStage !== this.state.gameStage) console.log(this.stateString());
  }

  render() {
    return (
        <div>
          { this.getScene() }
        </div>
    );
  }

  getScene() {
    switch (this.state.gameStage) {
      case stage.INTRO:
        return <IntroScreen advance={() => this.setScene(stage.SETUP)} />
      case stage.SETUP:
        return <SetupScreen advance={() => this.setScene(stage.GRADE_SCHOOL)}
                            playerIdx={this.state.player.idx}
                            setPlayerIdx={this.setPlayerIdx}
                            setPlayerName={this.setPlayerName} />
      case stage.GRADE_SCHOOL:
        return <GradeSchoolScreen advance={() => this.setScene(stage.HIGH_SCHOOL)}
                                  addPersonalityScore={this.addPersonalityScore}
                                  setPetIdx = {this.setPetIdx}
                                  petIdx={this.state.pet}
                                  // @ts-ignore
                                  decision={Decisions["GRADE_SCHOOL"]} />
      case stage.HIGH_SCHOOL:
        return <HighSchoolScreen  advance={() => this.setScene(stage.COLLEGE)}
                                  addPersonalityScore={this.addPersonalityScore}
                                  // @ts-ignore
                                  decisions={Decisions["HIGH_SCHOOL"]} />
      case stage.COLLEGE:
        return <CollegeScreen advance={() => this.setScene(stage.CAREER1)}
                              personality={this.state.personality}
                              setPersonality={this.setPersonality}
                              setCareer={this.setCareer}
                              scores={this.state.personalityScore}
                              // @ts-ignore
                              decision={Decisions["COLLEGE"]}/>
      case stage.CAREER1:
        return <Career1Screen advance={() => this.setScene(stage.LOVE)} />
      default:
        return <div/>
    }
  }

  setScene(scene: stage) {
    this.setState(prevState => ({...prevState, gameStage: scene}));
    const ages: {[scene: number] : Age} = {3: "adolescent", 4: "young_adult", 6: "adult", 8: "old"};
    if (scene in ages) this.setState(prevState => ({...prevState, player: {...prevState.player, age: ages[scene]}}));
  }

  setPlayerIdx(idx: number) {
    this.setState(prevState => ({...prevState, player: {...prevState.player, idx}}));
  }

  setPlayerName(name: string) {
    this.setState(prevState => ({...prevState, player: {...prevState.player, name}}));
  }

  setPetIdx (pet: number) {
    this.setState(prevState => ({...prevState, pet}))
  }

  addPersonalityScore(type: Personality, amt: number) {
    let scores: PersonalityScores = {...this.state.personalityScore};
    scores[type] += amt;
    this.setState(prevState => ({...prevState, personalityScore: scores}));
  }

  setPersonality(personality: Personality) {
    this.setState(prevState => ({...prevState, personality}));
  }

  setCareer(career: Career) {
    this.setState(prevState => ({...prevState, career}));
  }

}
