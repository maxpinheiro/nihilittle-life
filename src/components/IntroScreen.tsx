import React from 'react';

type IntroScreenProps = {
    advance: () => void
}

const IntroScreen: React.FC<IntroScreenProps> = ({
    advance
}) => {
    return (
        <div className="container d-flex flex-column text-center">
            <h3>Nihilittle Life</h3>
            <p>where nothing matters - in a good way</p>
            <button onClick={advance}>Start Game</button>
        </div>
    );
}

export default IntroScreen;