import React from 'react';
import classes from './Game-Card.module.css';

function GameCard({ game: { thumbnail, title, short_description, platform, freetogame_profile_url } }) {


    function handleShortDesc(data) {
        if (data?.length > 80) {
            return `${data.substring(0, 80)}...`
        }
        return data
    }

    return (
        <div className={classes.card}>
            <img src={thumbnail} alt={title} className={classes.card_image} />
            <div className={classes.card_content}>
                <h2 className={classes.card_title}>{title}</h2>
                <p className={classes.card_description}>{handleShortDesc(short_description)}</p>
                <div className={classes.footer_section}>
                    <div className={classes.platform_section}>{platform}</div>
                    <div><a href={freetogame_profile_url} rel="noreferrer" target="_blank">Open</a></div>
                </div>
            </div>
        </div>
    )
}

export default GameCard;
