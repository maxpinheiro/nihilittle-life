import React from 'react';
import './App.css';
import Decisions from "./decisions.json";

import IntroScreen from "./components/IntroScreen";
import SetupScreen from "./components/SetupScreen";
import GradeSchoolScreen from "./components/GradeSchoolScreen";
import HighSchoolScreen from "./components/HighSchoolScreen";

enum stage {INTRO, SETUP, GRADE_SCHOOL, HIGH_SCHOOL, COLLEGE, CAREER, LOVE, CAREER2, RETIREMENT, END_SCENE};
type age = 'child' | 'adolescent' | 'young_adult' | 'adult' | 'old';
type State = {
  gameStage: stage,
  player: { idx: number, name: string, age: age }
  personalityScore: PersonalityScores,
  pet: number
}

export type Personality = 'athlete' | 'artist' | 'programmer' | 'politician' | 'scientist' | 'writer';
export type PersonalityScores = {[type in Personality]: number};

const INIT_SCORES: PersonalityScores = {
  athlete: 0,
  artist: 0,
  programmer: 0,
  politician: 0,
  scientist: 0,
  writer: 0
}

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      gameStage: stage.INTRO,
      player: { idx: -1, name: '', age: 'child' },
      personalityScore: INIT_SCORES,
      pet: -1
    }

    this.getScene = this.getScene.bind(this);
    this.setScene = this.setScene.bind(this);
    this.setPetIdx = this.setPetIdx.bind(this);
    this.setPlayerIdx = this.setPlayerIdx.bind(this);
    this.setPlayerName = this.setPlayerName.bind(this);
    this.addPersonalityScore = this.addPersonalityScore.bind(this);
  }

  componentDidMount() {

  }

  render() {
    console.log(this.state);
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
                                  decisions={Decisions["HIGH_SCHOOL"]}/>
      default:
        return <div/>
    }
  }

  setScene(scene: stage) {
    this.setState(prevState => ({...prevState, gameStage: scene}));
    const ages: {[scene: number] : age} = {3: "adolescent", 4: "young_adult", 6: "adult", 8: "old"};
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

}
