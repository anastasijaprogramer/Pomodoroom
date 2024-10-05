import React from 'react';
import styles from "./style.module.scss";
import landscape from "../../assets/images/landscape.jpg";

import PomodoroTimer from "../PomodoroTimer";


const Pomodoroom = () => {
    return (
        <div className={styles.body}>
            <img className={styles.background} src={landscape} alt="landscape" />
            <h1 className={styles.heading}>Pomodoroom</h1>
            <PomodoroTimer/>
        </div>
    );
}

export default Pomodoroom;
