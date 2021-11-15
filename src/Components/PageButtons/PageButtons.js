import React, {useState } from "react";
import Styles from './PageButtons.module.css';

export const PageButtons = React.memo(({nextPage, prevPage, handlerPageSizeChange}) => {

    const [localPage, setLocalPage] = useState(1);
    
    return (
        <div className={Styles.Pagination}>
            <select onChange={(event) => handlerPageSizeChange(event)}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
            </select>
            <button
            onClick={
                () => {
                    if (localPage > 1) {
                        setLocalPage(localPage - 1);
                        prevPage();   
                    }
                }
            }
            >Prev page</button>
   
            <h3>{localPage}</h3>

            <button
                onClick={
                    () => {
                        setLocalPage(localPage + 1);
                        nextPage();
                    }
                }
            >Next page</button>
   
        </div>
    )
})