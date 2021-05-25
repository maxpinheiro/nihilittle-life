import React, {useState} from 'react';
import CharacterSelect from "./CharacterSelect";
import NameSelect from "./NameSelect";

type SetupScreenProps = {
    advance: () => void,
    playerIdx: number,
    setPlayerIdx: (idx: number) => void,
    setPlayerName: (name: string) => void
}
const SetupScreen: React.FC<SetupScreenProps> = ({
    advance,
    playerIdx,
    setPlayerIdx,
    setPlayerName
}) => {
    return (
        <div className="container text-center my-3" id="setup">
            <CharacterSelect playerIdx={playerIdx} setPlayerIdx={setPlayerIdx} />
            <NameSelect setPlayerName={setPlayerName} advance={advance} />
        </div>
    );
}

export default SetupScreen;
