import { TimerProvider } from './context/TimerContext';
import SpaceBackground from './components/SpaceBackground';
import CountdownDisplay from './components/CountdownDisplay';
import AdminPanel from './components/AdminPanel';
import StartAnimation from './components/StartAnimation';
import EndAnimation from './components/EndAnimation';
import './App.css';

function App() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}

// Separate component to use the context
import { useTimer } from './context/TimerContext';

function AppContent() {
  const { hasStarted, showStartAnimation, showEndAnimation, onStartAnimationComplete } = useTimer();

  return (
    <div className="app">
      <SpaceBackground hasStarted={hasStarted} />

      {/* Start Animation Overlay */}
      {showStartAnimation && <StartAnimation onComplete={onStartAnimationComplete} />}

      {/* End Animation Overlay */}
      <EndAnimation show={showEndAnimation} />

      <div className={`container ${hasStarted ? 'started' : ''}`}>
        {/* Header with Logo */}
        <header className="header">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <h1 className="logo-text">Prajwalan 2k26</h1>
          </div>
          <p className="tagline">24-Hour Innovation Challenge</p>
        </header>

        {/* Countdown Timer Display */}
        <CountdownDisplay />

        {/* Footer */}
        <footer className="footer">
        </footer>
      </div>

      {/* Admin Panel */}
      <AdminPanel />
    </div>
  );
}

export default App;
