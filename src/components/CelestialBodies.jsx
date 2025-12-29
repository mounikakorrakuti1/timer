import './CelestialBodies.css';

export function Moon() {
    return (
        <div className="celestial-body moon">
            <img src="/moon.png" alt="Moon" className="moon-image" />
            <span className="celestial-label">MOON</span>
        </div>
    );
}

export function Earth() {
    return (
        <div className="celestial-body earth">
            <img src="/earth.png" alt="Earth" className="earth-image" />
            <div className="earth-glow"></div>
            <span className="celestial-label">EARTH</span>
        </div>
    );
}
