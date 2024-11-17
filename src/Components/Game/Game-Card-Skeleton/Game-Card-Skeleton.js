import React from 'react';
import classes from './Game-Card-Skeleton.module.css';

export default function GameCardSkeleton() {
    const noOfIterations = [1, 2, 3, 4, 5, 6];
    return (
        <>
            {noOfIterations.map((val, index) => (
                <div key={val} className={classes.card}>
                    <div className={`${classes.skeleton} ${classes.skeleton_header}`}></div>
                    <div className={`${classes.skeleton} ${classes.skeleton_title}`}></div>
                    <div className={`${classes.skeleton} ${classes.skeleton_text}`}></div>
                    <div className={`${classes.skeleton} ${classes.skeleton_text}`}></div>
                    <div className={`${classes.skeleton} ${classes.skeleton_text}`}></div>
                    <div className={`${classes.skeleton} ${classes.skeleton_button}`}></div>
                </div>))}
        </>

    )
}
