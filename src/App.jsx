import { TimerProvider } from './context/TimerContext';
import SpaceBackground from './components/SpaceBackground';
import Spaceship from './components/Spaceship';
import CountdownDisplay from './components/CountdownDisplay';
import AdminPanel from './components/AdminPanel';
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
  const { progress, hasStarted } = useTimer();

  return (
    <div className="app">
      <SpaceBackground hasStarted={hasStarted} />
      <Spaceship progress={progress} hasStarted={hasStarted} />

      <div className={`container ${hasStarted ? 'started' : ''}`}>
        {/* Header with Logo */}
        <header className="header">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <img src="/logo.png" alt="Prajwalan 2k26" className="logo-image" />
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
