import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startTimer, stopTimer, resetTimer, toggleTimer, tick } from '../../features/timer/timerSlice';

import styles from "./style.module.scss";

const PomodoroTimer = () =>
{
    const dispatch = useDispatch();
    
    const { minutes, seconds, isActive, isSession } = useSelector((state) => state.timer);

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
            <h2 className={styles.sessionHeading}>{isSession ? 'Pomodoro Session' : 'Break'}</h2>
            <div className={styles.topAction}>
                <button onClick={() => dispatch(toggleTimer(true))} 
                        className={`${styles.button} ${isSession ? styles.active : ""}`}>Pomodoro</button>
                <button onClick={() => dispatch(toggleTimer(false))} 
                        className={`${styles.button} ${!isSession ? styles.active : ""}`}>Short Break</button>
                <button className={styles.button}>Long Break</button>
            </div>
            {/* timer */}
            <time className={styles.timer}>
                <span>{minutes.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span>{seconds.toString().padStart(2, '0')}</span>
            </time>

            {/* control timer */}
            <div className={styles.actionBtnWrapper}>
                <button onClick={() => dispatch(stopTimer())}>Stop</button>
                <button onClick={() => dispatch(startTimer())} className={styles.actionBtn}>Start</button>
                <button onClick={() => dispatch(resetTimer())}>Reset</button>
            </div>
        </div>
    );
}

export default PomodoroTimer;
