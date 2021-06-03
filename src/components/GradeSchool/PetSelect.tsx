import React, {useState} from 'react';

type PetProps = {
    setPetIdx: () => void,
    idx: number,
    selected: boolean
}
const petLabels: string[] = ['fish', 'cat', 'dog', 'guinea pig', 'snake'];
const PetIcon: React.FC<PetProps> = ({
    setPetIdx,
    idx,
    selected
}) => {
    return (
        <div className={`btn ${selected ? 'btn-info' : 'btn-outline-info'}`} onClick={setPetIdx} >
            <img src={`/nihilittle-life/media/pets/${idx + 1}.png`} alt=""/>
            <p>{petLabels[idx]}</p>
        </div>
    )
}

type PetSelectProps = {
    petIdx: number,
    setPetIdx: (pet: number) => void,
    advance: () => void,
}

const PetSelect: React.FC<PetSelectProps> = ({
    petIdx,
    setPetIdx,
    advance
}) => {
    const [petSelected, setPetSelected] = useState<boolean>(false);

    return (
        <div id="pet-select">
            <p>You're playing M.A.S.H. - what pet do you end up with?</p>
            <div>
                {Array(5).fill("").map((_, idx) => (
                    <PetIcon
                        setPetIdx={() => {
                            setPetIdx(idx);
                            setPetSelected(true);
                        }}
                        idx={idx} key={idx} selected={petIdx === idx}
                    />
                ))}
            </div>
            { <button disabled={!petSelected} className="btn btn-primary" onClick={advance}>Onward!</button> }
        </div>
    )
}

export default PetSelect;
