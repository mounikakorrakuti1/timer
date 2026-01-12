import { useTimer } from '../context/TimerContext';
import './SpaceOrbit.css';

export default function SpaceOrbit() {
    const { remainingSeconds, isRunning, hasStarted, totalDuration } = useTimer();

    // Calculate progress (0 to 1) - spaceship moves from Moon to Earth
    // At start (24 hours remaining): progress = 0 (at Moon)
    // At end (0 hours remaining): progress = 1 (at Earth)
    const progress = hasStarted ? ((totalDuration - remainingSeconds) / totalDuration) * 100 : 0;

    return (
        <div className="space-orbit-container">
            {/* Orbital Path - SVG arc from Moon to Earth */}
            <svg className="orbital-path" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="var(--neon-purple)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--neon-pink)" stopOpacity="0.8" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* The orbital path - semi-circular arc from right (Moon) to left (Earth) */}
                <path
                    id="orbitPath"
                    d="M 850 450 Q 500 50, 150 450"
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    filter="url(#glow)"
                    className="orbit-line"
                />
            </svg>

            {/* Earth - positioned on the left */}
            <div className="celestial-body earth">
                <img src="/earth.png" alt="Earth" />
                <div className="planet-glow earth-glow"></div>
            </div>

            {/* Moon - positioned on the right */}
            <div className="celestial-body moon">
                <img src="/moon.png" alt="Moon" />
                <div className="planet-glow moon-glow"></div>
            </div>

            {/* Spaceship with flame - only show when timer has started */}
            {hasStarted && (
                <div
                    className={`spaceship-wrapper ${isRunning ? 'moving' : 'paused'}`}
                    style={{
                        '--progress': `${progress}%`,
                        '--duration': `${totalDuration}s`
                    }}
                >
                    {/* Flame trail behind spaceship */}
                    <div className="flame-trail">
                        <div className="flame-particle flame-1"></div>
                        <div className="flame-particle flame-2"></div>
                        <div className="flame-particle flame-3"></div>
                    </div>

                    {/* Spaceship */}
                    <img src="/spaceship.png" alt="Spaceship" className="spaceship" />
                </div>
            )}
        </div>
    );
}
