import React from "react";
import styles from './CharacterInList.module.css';
import { useNavigate } from "react-router";

export const CharacterInList = React.memo(({character, pageSize}) => {

    const {id, name, image, species} = character;

    const navigate = useNavigate();

    let cardSize = styles.Card;

    if(pageSize > 5) {
        console.log("Xd")
        cardSize += " "+styles.Medium;
    }

    if(pageSize > 15) {
        cardSize +=" "+styles.Small+" "+styles.Small_Font;
    }

    return (
        <li className={cardSize} onClick={() => navigate("/character/"+id)}>
            <img alt={name} src={image} />
            <div className={styles.Info}>
                <h1>{name}</h1>
                <h2>{species}</h2>
            </div>
        </li> 
    )
})