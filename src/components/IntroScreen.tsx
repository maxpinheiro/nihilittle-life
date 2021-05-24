import React from 'react';

type IntroScreenProps = {
    advance: () => void
}

const IntroScreen: React.FC<IntroScreenProps> = ({
    advance
}) => {
    return (
        <div className="container col text-center" id="intro">
            <h3>Nihilittle Life</h3>
            <p>where nothing matters - in a good way</p>
            <button className="btn btn-info" onClick={advance}>Start Game</button>
        </div>
    );
}

export default IntroScreen;
