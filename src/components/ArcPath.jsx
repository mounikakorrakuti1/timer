import { useTimer } from '../context/TimerContext';
import './ArcPath.css';

export default function ArcPath() {
    const { progress } = useTimer();

    // Calculate stroke-dashoffset based on remaining time
    const arcLength = 750; // Approximate path length for the adjusted curve
    const dashOffset = arcLength * progress;

    // Arc path adjusted to connect Moon (left, bottom) to Earth (right, bottom)
    // Start: near Moon position, End: near Earth position
    // Using a quadratic bezier curve that arcs upward
    const arcPath = "M 80 220 Q 400 30 720 220";

    return (
        <svg className="arc-svg" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
            {/* Gradient and filter definitions */}
            <defs>
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="50%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background arc (full path - dashed) */}
            <path
                className="arc-background"
                d={arcPath}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="3"
                strokeDasharray="8,6"
            />

            {/* Progress arc (remaining time - solid gradient) */}
            <path
                id="arc-progress"
                className="arc-progress"
                d={arcPath}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{
                    strokeDasharray: arcLength,
                    strokeDashoffset: dashOffset,
                    filter: 'url(#glow)'
                }}
            />
        </svg>
    );
}
