import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./style.module.scss";

import PomodoroTimer from "../PomodoroTimer";
import Navigation from "../Navigation";


const Pomodoroom = () =>
{
    const endpoint = "https://bing.biturl.top/?resolution=UHD&format=json&index=0&mkt=en-US";
    const [imageData, setImageData] = useState();

    useEffect(() =>
    {
        axios.get(endpoint)
            .then(response =>
            {
                if (response.data) {
                    setImageData(response.data);
                }
            })
            .catch(error => console.error("Error fetching the image: ", error))

    }, []);

    return (
        <div className={styles.body}>
            {imageData && <img className={styles.background} src={imageData.url} alt="landscape" />}
            <div>
                <Navigation />
                <PomodoroTimer />
            </div>
        </div>
    );
}

export default Pomodoroom;
