import React from 'react';

type IntroScreenProps = {
    advance: () => void
}

const IntroScreen: React.FC<IntroScreenProps> = ({
    advance
}) => {
    return (
        <div>
            <button onClick={advance}>Start Game</button>
        </div>
    );
}

export default IntroScreen;