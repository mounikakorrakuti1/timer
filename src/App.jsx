import { TimerProvider } from './context/TimerContext';
import StarBackground from './components/StarBackground';
import CountdownDisplay from './components/CountdownDisplay';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <TimerProvider>
      <div className="app">
        <StarBackground />

        <div className="container">
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
            <p>© 2026 Prajwalan Hackathon | Built with 💜 for Innovation</p>
          </footer>
        </div>

        {/* Admin Panel */}
        <AdminPanel />
      </div>
    </TimerProvider>
  );
}

export default App;
