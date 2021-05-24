import React, {useState} from 'react';

enum Stage {CHARACTER, NAME};

type CharacterProps = {
    setPlayerIdx: () => void,
    idx: number,
    selected: boolean
}
const Character: React.FC<CharacterProps> = ({
    setPlayerIdx,
    idx,
    selected
 }) => {
    return (
        <div className="col" onClick={setPlayerIdx} style={{ border: selected ? 'solid 2px blue' : ''}}>
            <img src={`media/players/${idx+1}_intro.png`} alt="" />
        </div>
    )
}

type CharacterSelectProps = {
    playerIdx: number,
    setPlayerIdx: (idx: number) => void,
    setStage: (stage: Stage) => void
}
const CharacterSelect: React.FC<CharacterSelectProps> = ({
    playerIdx,
    setPlayerIdx,
    setStage
}) => {
    return (
        <div id="character-select">
            <p>Choose your character:</p>
            <div className="row justify-content-evenly">
                {Array(4).fill("").map((_, idx) => (
                    <Character
                        setPlayerIdx={() => {
                            setPlayerIdx(idx);
                            setStage(Stage.NAME);
                        }}
                        idx={idx} selected={playerIdx === idx} key={idx}
                    />
                ))}
            </div>
        </div>
    )
}

type NameSelectProps = {
    setPlayerName: (name: string) => void,
    setSelected: (selected: boolean) => void
}
const NameSelect: React.FC<NameSelectProps> = ({
    setPlayerName,
    setSelected
}) => {
    return (
        <div id="name-select" className="my-2">
            <form>
                <label htmlFor="name" className="mr-2">Choose your name: </label>
                <input type="text" id="name" name="name" autoComplete="off"
                       onChange={(e) => {setPlayerName(e.target.value); setSelected(true);}} />
            </form>
        </div>
    )
}

type SetupScreenProps = {
    playerIdx: number,
    setPlayerIdx: (idx: number) => void,
    setPlayerName: (name: string) => void,
    advance: () => void
}
const SetupScreen: React.FC<SetupScreenProps> = ({
    playerIdx,
    setPlayerIdx,
    setPlayerName,
    advance
}) => {
    const [stage, setStage] = useState<Stage>(Stage.CHARACTER);
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <div className="container text-center my-3" id="setup">
            <CharacterSelect playerIdx={playerIdx} setPlayerIdx={setPlayerIdx} setStage={(stage) => setStage(stage)} />
            { stage === Stage.NAME && <NameSelect setPlayerName={setPlayerName} setSelected={(selected) => setSelected(selected)} /> }
            { selected && <button className="btn btn-warning" onClick={advance}>Start your life!</button>}
        </div>
    );
}

export default SetupScreen;
