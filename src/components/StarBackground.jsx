import './StarBackground.css';

export default function StarBackground() {
    return (
        <div className="space-background">
            <video
                className="background-video"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/Video_Enhancement_and_Generation.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
