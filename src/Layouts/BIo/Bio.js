import React, { useEffect, useState }  from "react";
import { useNavigate, useParams } from "react-router";
import Styles from './Bio.module.css';
export const Bio = () => {

    let params = useParams();

    let id = params["id"];

    let navigate = useNavigate();

    const [character, setCharacter] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `https://rickandmortyapi.com/api/character/${id}`;
        setLoading(true);
        fetch(url).then((resp) => resp.json())
            .then(
                (result) => {
                    setCharacter(result);
                    setLoading(false);
                }
            )
    },[id]);

    const {name, image, gender, species} = character;

    const display = loading ? <h1>Loading...</h1> : (
        <div className={Styles.Container}>
            <div className={Styles.Left}>
                
                <img alt={name} src={image} />
                <button
                    onClick={
                        () => navigate("/")
                    }
                >Exit</button>
            </div>
            <div className={Styles.Right}>
                <h1>{name}</h1>
                <h3>{species}</h3>
                <h2>{gender}</h2>
                <h2>{character["status"]}</h2>
                <h2>Total of episodes : {character["episode"].length}</h2>
            </div>

        </div>
    );

    return display;
}