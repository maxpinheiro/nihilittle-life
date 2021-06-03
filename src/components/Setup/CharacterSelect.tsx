import React from "react";

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
    setPlayerIdx: (idx: number) => void
}
const CharacterSelect: React.FC<CharacterSelectProps> = ({
    playerIdx,
    setPlayerIdx
}) => {
    return (
        <div id="character-select">
            <p>Choose your character:</p>
            <div className="row justify-content-evenly">
                {Array(4).fill("").map((_, idx) => (
                    <Character
                        setPlayerIdx={() => {
                            setPlayerIdx(idx);
                        }}
                        idx={idx} selected={playerIdx === idx} key={idx}
                    />
                ))}
            </div>
        </div>
    )
}

export default CharacterSelect;
