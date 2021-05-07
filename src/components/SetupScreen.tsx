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

type SetupScreenProps = {
    playerIdx: number,
    setPlayerIdx: (idx: number) => void,
    advance: () => void
}
const SetupScreen: React.FC<SetupScreenProps> = ({
    playerIdx,
    setPlayerIdx,
    advance
}) => {
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <div>
            <div id="character-row">
                {Array(3).fill("").map((_, idx) => (
                    <Character
                        setPlayerIdx={() => {
                            setPlayerIdx(idx);
                            setSelected(true);
                        }}
                        idx={idx} selected={playerIdx === idx}
                    />
                ))}
            </div>
            { selected && <button onClick={advance}>Start your life!</button>}
        </div>
    );
}

export default SetupScreen;