import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, resetTimer, tick, setMode } from '../../features/timer/timerSlice';

import styles from "./style.module.scss";

const PomodoroTimer = () =>
{
    const dispatch = useDispatch();
    const POMODORO = "pomodoro";
    const SHORT_BREAK = "shortBreak";
    const LONG_BREAK = "longBreak";

    const { minutes, seconds, isActive, mode } = useSelector((state) => state.timer);

    useEffect(() =>
    {
        let interval = null;
        if (isActive) {
            interval = setInterval(() =>
            {
                dispatch(tick());
            }, 1000); // tick on every second
        } else if (!isActive && minutes === 0 && seconds === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);

    }, [isActive, dispatch, minutes, seconds]);


    return (
        <div className={styles.timerWrapper}>
            <h2 className={styles.sessionHeading}>
                {mode === POMODORO ? 'Pomodoro Session' : mode === SHORT_BREAK ? 'Break' : "Long Break"}
            </h2>
            <div className={styles.topAction}>
                <button onClick={() => dispatch(setMode(POMODORO))}
                    className={`${styles.button} ${mode === POMODORO ? styles.active : ""}`}>Pomodoro</button>
                <button onClick={() => dispatch(setMode(SHORT_BREAK))}
                    className={`${styles.button} ${mode === SHORT_BREAK ? styles.active : ""}`}>Short Break</button>
                <button onClick={() => dispatch(setMode(LONG_BREAK))}
                    className={`${styles.button} ${mode === LONG_BREAK ? styles.active : ""}`}>Long Break</button>
            </div>
            {/* timer */}
            <time className={styles.timer}>
                <span>{minutes.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span>{seconds.toString().padStart(2, '0')}</span>
            </time>

            {/* control timer */}
            <div className={styles.actionBtnWrapper}>

                <button onClick={() => dispatch(resetTimer())}>Reset</button>
                <button onClick={() => isActive ? dispatch(stopTimer()) : dispatch(startTimer())}
                    className={styles.actionBtn}>
                        {isActive ? 'Stop' : 'Start'}
                </button>
                <button onClick={() => dispatch(resetTimer())}>Reset</button>
            </div>
        </div>
    );
}

export default PomodoroTimer;
