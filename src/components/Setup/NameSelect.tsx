import React, {useState} from 'react';

type NameSelectProps = {
    setPlayerName: (name: string) => void,
    advance: () => void
}
const NameSelect: React.FC<NameSelectProps> = ({
    setPlayerName,
    advance
}) => {
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <div id="name-select" className="my-2">
            <div>
                <label htmlFor="name" className="mr-2">Choose your name: </label>
                <input type="text" id="name" name="name" autoComplete="off"
                       onChange={(e) => {setPlayerName(e.target.value); setSelected(true);}} />
            </div>
            <button disabled={!selected} className="btn btn-warning" onClick={advance}>Start your life!</button>
        </div>
    )
}

export default NameSelect;
