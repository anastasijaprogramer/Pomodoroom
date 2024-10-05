import React from 'react';
import styles from "./style.module.scss";

const PomodoroTimer = () =>
{
    return (
        <div className={styles.timerWrapper}>
            <div className={styles.topAction}>
                <button className={styles.button}>Pomodoro</button>
                <button className={`${styles.button} ${styles.active} `}>Short Break</button>
                <button className={styles.button}>Long Break</button>
            </div>
            <time className={styles.timer}>14:30</time>
            <button className={styles.actionBtn}>START</button>
        </div>
    );
}

export default PomodoroTimer;
