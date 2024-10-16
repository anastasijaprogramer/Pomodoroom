import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImage, setImage } from '../../features/image/imageSlice';
import styles from "./style.module.scss";

import PomodoroTimer from "../PomodoroTimer";
import Navigation from "../Navigation";
import Comments from '../Comments';


const Pomodoroom = () =>
{
    const dispatch = useDispatch();
    const { url, loading, error } = useSelector((state) => state.image)

    const [index, setIndex] = useState(0); // Keep track of the current index

    useEffect(() =>
    {
        if (!url) {
            dispatch(fetchImage());
        }
    }, [dispatch, index, url]);

    const handlePreviousDay = () =>
    {
        if (index < 5) {
            setIndex((prevIndex) => prevIndex + 1);
            dispatch(fetchImage(index + 1));
        }
        else {
            console.log('there is no image left to load')
        }
    };

    const handleNextDay = () =>
    {
        if (index > 0) {
            setIndex((prevIndex) => prevIndex - 1);
            dispatch(fetchImage(index - 1));
        }
    };

    const handleRandomImage = () =>
    {
        dispatch(fetchImage('random'));
    };

    const saveCurrentImage = () =>
    {
        dispatch(setImage(url)); // Save the current image to local storage
        alert('Image saved as your preferred background!');
    };

    return (
        <div className={styles.body}>
            {url && <img className={styles.background} src={url} alt="Bing Daily" />}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div>
                <Navigation />
                <PomodoroTimer />
                <Comments/>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={handlePreviousDay} disabled={index === 5}>
                    Previous Day
                </button>
                <button onClick={handleNextDay} disabled={index === 0}>
                    Next Day
                </button>
                <button onClick={handleRandomImage}>Random Image</button>
                <button onClick={saveCurrentImage} style={{ marginLeft: '10px' }}>
                    Save as Background
                </button>
            </div>
        </div>
    );
}

export default Pomodoroom;
