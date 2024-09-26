import React from 'react';
import Confetti from 'react-confetti';

const Celebration = ({ show }: { show: boolean }) => {
    const { innerWidth: width, innerHeight: height } = window;

    return (
        <>
            {show && <Confetti width={width} height={height} />}
        </>
    );
};

export default Celebration;
