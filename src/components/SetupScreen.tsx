import React, {useState} from 'react';

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
        <div onClick={setPlayerIdx} style={{backgroundColor: 'gray', border: selected ? 'solid 2px red' : ''}}>
            <img src={`/nihilittle-life/media/players/${idx+1}_intro.png`} alt="" />
        </div>
    )
}

enum Stage {CHARACTER, NAME};

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
    const [selected, setSelected] = useState<boolean>(false);
    const [stage, setStage] = useState<Stage>(Stage.CHARACTER);

    return (
        <div>
            <div id="character-row">
                {Array(3).fill("").map((_, idx) => (
                    <Character
                        setPlayerIdx={() => {
                            setPlayerIdx(idx);
                            setStage(Stage.NAME);
                        }}
                        idx={idx} selected={playerIdx === idx}
                    />
                ))}
            </div>
            {stage === Stage.NAME &&
                <div>
                    <form id="name-input">
                        <label htmlFor="name">Choose your name: </label>
                        <input type="text" id="name" name="name" autoComplete="off"
                               onChange={(e) => {setPlayerName(e.target.value); setSelected(true);}} />
                    </form>
                </div>
            }
            { selected && <button onClick={advance}>Start your life!</button>}
        </div>
    );
}

export default SetupScreen;