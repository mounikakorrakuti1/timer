import { useEffect, useState } from 'react';
import { useTimer } from '../context/TimerContext';
import './Astronaut.css';

export default function Astronaut() {
    const { progress } = useTimer();
    const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });

    useEffect(() => {
        const updatePosition = () => {
            const arcPath = document.getElementById('arc-progress');
            if (!arcPath) return;

            const pathLength = arcPath.getTotalLength();
            const point = arcPath.getPointAtLength(pathLength * progress);

            // Calculate rotation (tangent angle)
            const epsilon = 0.01;
            const nextProgress = Math.min(1, progress + epsilon);
            const nextPoint = arcPath.getPointAtLength(pathLength * nextProgress);

            const dx = nextPoint.x - point.x;
            const dy = nextPoint.y - point.y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Convert SVG coords to screen coords
            const svg = arcPath.ownerSVGElement;
            const container = svg?.parentElement;

            if (svg && container) {
                const svgRect = svg.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                // Match the viewBox dimensions from ArcPath.jsx (800 x 280)
                const scaleX = svgRect.width / 800;
                const scaleY = svgRect.height / 280;

                const x = (point.x * scaleX) + (svgRect.left - containerRect.left);
                const y = (point.y * scaleY) + (svgRect.top - containerRect.top);

                setPosition({ x, y, rotation: angle });
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
    }, [progress]);

    return (
        <div
            className={`astronaut ${progress >= 1 ? 'arrived' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`
            }}
        >
            <div className="astronaut-body">
                <div className="helmet">
                    <div className="helmet-visor"></div>
                    <div className="helmet-reflection"></div>
                </div>
                <div className="suit">
                    <div className="chest-pack"></div>
                </div>
                <div className="arm left-arm"></div>
                <div className="arm right-arm"></div>
                <div className="leg left-leg"></div>
                <div className="leg right-leg"></div>
                <div className="jetpack">
                    <div className="jet-flame"></div>
                </div>
            </div>
            <div className="astronaut-trail"></div>
        </div>
    );
}
