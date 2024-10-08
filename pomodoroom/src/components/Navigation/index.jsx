import React from 'react';
import styles from "./style.module.scss";
import { BsFillLightbulbFill, BsFillGearFill } from "react-icons/bs";

const Navigation = () =>
{
    return (
        <nav className={styles.wrapper}>
            <h1 className={styles.heading}>Pomodoroom</h1>
            <div className={styles.btnWrapper}>
                {/* gear icon could rotate and change color on click  */}
                <button className={styles.navBtn}>Settings <BsFillGearFill /></button>
                
              
                <input type="checkbox" id="toggle" className={styles.toggleCheckbox} />
                <label for="toggle" className={styles.toggleLabel}>
                    <span className={styles.toggleBackground}></span>
                </label>
                {/* this will replace BING wallpaper */}
                {/* <div className={styles.background}></div> */}
            </div>
        </nav>
    );
}

export default Navigation;
