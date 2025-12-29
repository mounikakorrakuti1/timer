import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TimerContext = createContext(null);

const TOTAL_DURATION_SECONDS = 24 * 60 * 60; // 24 hours
const STORAGE_KEY = 'prajwalan2k26_react_timer';

export function TimerProvider({ children }) {
    const [remainingSeconds, setRemainingSeconds] = useState(TOTAL_DURATION_SECONDS);
    const [isRunning, setIsRunning] = useState(false); // Start paused
    const [hasStarted, setHasStarted] = useState(false); // Track if timer has ever been started
    const [startTimestamp, setStartTimestamp] = useState(null);

    // Load saved state on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const { timestamp, remaining, running, started } = JSON.parse(saved);
            if (started) {
                setHasStarted(true);
                if (running) {
                    const elapsed = Math.floor((Date.now() - timestamp) / 1000);
                    setRemainingSeconds(Math.max(0, remaining - elapsed));
                    setIsRunning(true);
                } else {
                    setRemainingSeconds(remaining);
                    setIsRunning(false);
                }
            }
            setStartTimestamp(timestamp);
        }
    }, []);

    // Save state periodically
    useEffect(() => {
        const saveState = () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                timestamp: Date.now(),
                remaining: remainingSeconds,
                running: isRunning,
                started: hasStarted
            }));
        };
        saveState();
        const interval = setInterval(saveState, 10000);
        return () => clearInterval(interval);
    }, [remainingSeconds, isRunning, hasStarted]);

    // Countdown logic
    useEffect(() => {
        if (!isRunning || remainingSeconds <= 0) return;

        const interval = setInterval(() => {
            setRemainingSeconds(prev => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, remainingSeconds]);

    // Timer controls
    const start = useCallback(() => {
        setHasStarted(true);
        setIsRunning(true);
        if (!startTimestamp) {
            setStartTimestamp(Date.now());
        }
    }, [startTimestamp]);

    const pause = useCallback(() => setIsRunning(false), []);
    const toggle = useCallback(() => setIsRunning(prev => !prev), []);

    const reset = useCallback(() => {
        setRemainingSeconds(TOTAL_DURATION_SECONDS);
        setIsRunning(false);
        setHasStarted(false);
        setStartTimestamp(null);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    const setTime = useCallback((hours, minutes, seconds) => {
        const total = (hours * 3600) + (minutes * 60) + seconds;
        setRemainingSeconds(Math.max(0, Math.min(TOTAL_DURATION_SECONDS, total)));
    }, []);

    const skipForward = useCallback((seconds = 3600) => {
        setRemainingSeconds(prev => Math.max(0, prev - seconds));
    }, []);

    const skipBackward = useCallback((seconds = 3600) => {
        setRemainingSeconds(prev => Math.min(TOTAL_DURATION_SECONDS, prev + seconds));
    }, []);

    const progress = 1 - (remainingSeconds / TOTAL_DURATION_SECONDS);

    const value = {
        remainingSeconds,
        isRunning,
        hasStarted,
        progress,
        totalDuration: TOTAL_DURATION_SECONDS,
        start,
        pause,
        toggle,
        reset,
        setTime,
        skipForward,
        skipBackward,
    };

    return (
        <TimerContext.Provider value={value}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
}
