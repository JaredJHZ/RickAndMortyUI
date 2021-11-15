import React, {useCallback, useEffect, useState} from 'react';
import { Characters } from '../../Components/Characters/Character';
import { PageButtons } from '../../Components/PageButtons/PageButtons';
import { Search } from '../../Components/Search/Search';

export const Main = () => {

    const [charactersLoaded, setCharactersLoaded] = useState([]);
    const [limit, setLimit] = useState({increase:5, limitBot:0, limitTop: 5 , total:20 });
    const [characters, setCharacter] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [error,setError] = useState("");

    const getCharacters = useCallback(async () => {
        const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
        const listOfCharacters = await fetch(url);
        return listOfCharacters.json();
    },[page]);

    const getCharacterByName = useCallback(async () => {
        const url = `https://rickandmortyapi.com/api/character/?name=${filter}`
        const filteredCharacters = await fetch(url);
        if (filteredCharacters.status !== 200) {
            setError("Not Found");
            return {};
        } else {
            setError("");
            return filteredCharacters.json();
        }
    },[filter]);

    const setLocalPagination = useCallback(() => {
        if (error.length < 1) {
            return charactersLoaded
            .filter(
                (character, index) => {
                    if(index >= limit["limitBot"] && index < limit["limitTop"]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            )   
        }
    }, [charactersLoaded, error, limit]);

    const nextPage = () => {

        if (limit["limitTop"] + limit["increase"] > limit["total"]){
            
            setLimit(prev => {
                return {
                    ...prev, 
                    limitBot:0, 
                    limitTop: prev["increase"]
                    
                }
            })
            setPage((prevPage) => prevPage + 1)
        } else {
            setLimit(
                prev => {
                    return {
                        ...prev, 
                        limitBot: prev["limitBot"] + prev["increase"],
                        limitTop: prev["limitTop"] + prev["increase"]
                    }
                }
            )
        }
    }

    const prevPage = () => {
        if (limit["limitBot"] - limit["increase"] < 0){
            
            setLimit(prev => {
                return {
                    ...prev, 
                    limitBot: 20 - prev["increase"],
                    limitTop: 20
                    
                }
            })
            setPage((prevPage) => prevPage - 1)
        } else {
            setLimit(
                prev => {
                    return {
                        ...prev, 
                        limitBot: prev["limitBot"] - prev["increase"],
                        limitTop: prev["limitTop"] - prev["increase"]
                    }
                }
            )
        }
    }

    const handlerPageSizeChange = ({target}) => {
        const value = target?.value;
        setLimit(
            prev => {
                return {
                    ...prev,
                    increase: value,
                    limitTop: prev["limitBot"] + value
                }
            }
        )
    }

    useEffect( () => {
        setLoading(true);
        getCharacters().then(
            (listOfCharacters) => {
                setCharactersLoaded(listOfCharacters["results"]);
                setLoading(false);
            }
        );
    } , [page, getCharacters] )

    useEffect( () => {
        setLoading(true);
        getCharacterByName().then(
            (listOfCharacters) => {
                setCharactersLoaded(listOfCharacters["results"]);
                setLoading(false);
            }
        );
    } , [filter, getCharacterByName] )

    useEffect( () => {
       setCharacter(setLocalPagination());
    }, [charactersLoaded , setLocalPagination])

    useEffect( () => {
        setCharacter(setLocalPagination());
    }, [limit ,setLocalPagination])

    console.log(characters);

    const pageSection = (
        <>
            <Characters pageSize={limit["increase"]} characters={characters} loading={loading} />
            <PageButtons nextPage={nextPage} prevPage={prevPage} handlerPageSizeChange={handlerPageSizeChange} />
        </>
    )


    return (
        <div style={{height:'100vh'}} >
            <header style={{height:'20%', background:"#7f867b"}}>
                <h1>Hello welcome to the rick and morty wiki</h1>
                <Search filter={filter} setFilter={setFilter} />
            </header>
            <section style={{height:'70%'}}>
               {error.length > 1 ? <h1>{error}</h1> : pageSection}
            </section>
        </div>
    )

}