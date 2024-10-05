import React from 'react'; 
import styles from "./style.module.scss";
import { BsFillLightbulbFill, BsFillGearFill  } from "react-icons/bs";

const Navigation = () =>
{
    return (
        <nav className={styles.wrapper}>
            <h1 className={styles.heading}>Pomodoroom</h1>
            <div className={styles.btnWrapper}>
                <button className={styles.navBtn}>Settings <BsFillGearFill /></button>
                <button className={styles.navBtn}>Turn off the lights <BsFillLightbulbFill /></button>
            </div>
        </nav>
    );
}

export default Navigation;
