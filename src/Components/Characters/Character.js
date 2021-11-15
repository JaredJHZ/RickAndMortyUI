import React from "react";
import { CharacterInList } from "../CharacterInLIst/CharacterInList";

import styles from './Character.module.css';

export const Characters = React.memo( ({characters, loading, pageSize}) => {

    return (
        <div className={styles.Container}>
            <ul>
            {
              loading === false ? (characters.map(
                  (character) => <CharacterInList pageSize={pageSize} character={character} key={character.id} />
              )) : <h1>no</h1>
            }
            </ul>
        </div>
    )

})