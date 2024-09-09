import React from 'react';
import './tiles.css';


// clickhandler la jag till så jag lätt kunde byta färg på rutorna när dem satt på rätt plats.
function Tiles({ value, clickHandler, style }) {
    return (
        <div 
          className={value === 0 ? 'EmptyTile' : 'FillTile'} 
          onClick={() => clickHandler(value)}
          style={style} 
        >
            {value}
        </div>
    );
}


export default Tiles;