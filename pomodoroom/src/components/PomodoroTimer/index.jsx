import React, { useState, useEffect } from 'react';
import styles from "./style.module.scss";

const PomodoroTimer = () =>
{
    const [timer, setTimer] = useState(15);

    useEffect(() =>
    {

        setTimeout(() =>
        {
            if (timer > 0) {
                setTimer((prev) => prev - 1);
            }

        }, 1000);

    }, [timer]);


    return (
        <div className={styles.timerWrapper}>
            <div className={styles.topAction}>
                <button className={styles.button}>Pomodoro</button>
                <button className={`${styles.button} ${styles.active} `}>Short Break</button>
                <button className={styles.button}>Long Break</button>
            </div>
            <time className={styles.timer}>{timer}</time>
            <button className={styles.actionBtn}>START</button>
        </div>
    );
}

export default PomodoroTimer;
