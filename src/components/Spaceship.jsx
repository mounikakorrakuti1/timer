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
        // Sequence: 
        // 0-2.0s: Planets Enter
        // 2.0s-3.5s: Path Draws
        // 3.5s+: Spaceship Appears

        // Calculate position based on progress
        // Direction: Earth (Left) -> Moon (Right)
        // X: Moves from Left (25%) to Right (80%)

        const startX = 25; // Reverted to 25
        const endX = 80; // Reverted to 80
        const currentX = startX + (endX - startX) * progress;

        // Y position. 
        // Path goes from Y=55 to Y=15 (Control point). 
        // Midpoint Y (Peak) calculation:
        // t=0.5 -> 0.25*55 + 0.5*15 + 0.25*55 = 13.75 + 7.5 + 13.75 = 35.
        // Start Y is 55. Peak Y is 35. Delta is 20.

        const normalizedArcY = 4 * progress * (1 - progress); // Parabola 0 -> 1 -> 0
        const currentY = 55 - (normalizedArcY * 20);

        // Rotation
        // Tangent of the curve. 
        // Travel is Left to Right.
        // At start (progress 0), moving Up-Right.
        // At mid (progress 0.5), moving Right.
        // At end (progress 1), moving Down-Right.

        // Tilt: Positive at start (pointing up), Negative at end (pointing down)
        // Wait, standard rotation: 0 is Right.
        // Up-Right is negative degrees (counter-clockwise).
        // Down-Right is positive degrees.

        const tilt = (0.5 - progress) * 60; // 30deg at start, -30deg at end?
        // Let's check:
        // p=0 -> tilt=30. We want Up-Right. -30deg. So multiply by -1.
        // p=1 -> tilt=-30. We want Down-Right. +30deg.

        const rotation = -tilt; // -30 (Up) to +30 (Down)

        setStyle({
            left: `${currentX}%`,
            top: `${currentY}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`
        });

    }, [progress]);

    return (
        <div className="spaceship-container" style={style}>
            <div className="spaceship-wrapper">
                <img src="/spaceship.png" alt="Spaceship" className="spaceship-img" />
                <div className="engine-flame"></div>
            </div>
        </div>
    );
};

export default Spaceship;
