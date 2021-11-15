import React from 'react';

export const Search = ({setFilter , filter}) => {
    return (
        <div style={{margin:'20px'}}>
            <input placeholder="Searh Character" onChange={(e) => setFilter(e.target.value)}  value={filter} />
        </div>
    )
}