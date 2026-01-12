import React from 'react';
import './SpaceBackground.css';
import Particles from './Particles';

const SpaceBackground = ({ hasStarted }) => {
    return (
        <div className="space-background">
            <div className="particles-wrapper">
                <Particles
                    particleColors={['#ffffff', '#ffffff']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>

            {/* SVG Path for Spaceship Trajectory */}
            {hasStarted && (
                <svg
                    className="trajectory-svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* 
                        Path coordinates in 0-100 space:
                        Start: 25, 55 (Earth Edge)
                        Control: 52.5, 15 (Centered X: (25+80)/2 = 52.5)
                        End: 80, 55 (Moon Edge)
                    */}
                    <path
                        d="M 25 55 Q 52.5 15 80 55"
                        fill="none"
                        stroke="rgba(0, 243, 255, 0.8)"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                        className="trajectory-path"
                    />
                </svg>
            )}

            <div className={`celestial-body earth ${hasStarted ? 'visible' : ''}`}>
                <img src="/earth-v3.png" alt="Earth" />
            </div>

            <div className={`celestial-body moon ${hasStarted ? 'visible' : ''}`}>
                <img src="/moon-latest.png" alt="Moon" />
            </div>
        </div>
    );
};

export default SpaceBackground;
