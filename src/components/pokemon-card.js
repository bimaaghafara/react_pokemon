import React from 'react';
import './pokemon-card.scss';

function PokemonCard(props) {
    return (
        <div className="pokemon-card-wrapper" onClick={props.onClick}>
            <div 
                className="img-wrapper"
                style={{backgroundImage: `url('${props.image}')`}}
            />
            <div className="description">
                <div className="name text-right">
                    {props.number} - {props.name}
                </div>
                <div className="types text-right">
                   {props.classification} ({props.types.map((type, index) => 
                        index < props.types.length-1
                        ? <span key={index}>{type}, </span>
                        : <span key={index}>{type}</span>
                    )})
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;