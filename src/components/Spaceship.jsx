import React, { useEffect, useState } from 'react';
import './Spaceship.css';

const Spaceship = ({ progress, hasStarted }) => {
    if (!hasStarted) return null;

    // progress is 0 to 1. 
    // 0 = Start (Moon/Right)
    // 1 = End (Earth/Left)

    // We need to map this progress to a position on the screen.
    // The path is a semi-circle arching upwards.

    // Let's use CSS variables to control position for performance
    const [style, setStyle] = useState({ opacity: 0 }); // Start invisible

    useEffect(() => {
        // Linear movement from Earth edge (10%) to Moon edge (90%)
        const startX = 10;
        const endX = 90;
        const currentX = startX + (endX - startX) * progress;

        setStyle({
            left: `${currentX}%`,
            top: `50%`,
            transform: `translate(-50%, -50%)`
        });
    }, [progress]);

    return (
        <div className="spaceship-container" style={style}>
            <img src="/spaceship-final.png" alt="Spaceship" className="spaceship-img" />
        </div>
    );
};

export default Spaceship;
