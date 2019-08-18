import React from 'react';
import './pokemon-profile.scss';

function PokemonProfile(props) {
    return (
        <div className="pokemon-profile-wrapper">
            <div 
                className="img-wrapper"
                style={{backgroundImage: `url('${props.image}')`}}
            />
            <div className="middle-description">
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
            <div className="bottom-description">
                <div className="maxHP">
                    <span className="label label-danger">Max HP</span> :
                    <span className="label label-default">{props.maxHP}</span>
                </div>
                <div className="maxCP">
                    <span className="label label-primary">Max CP</span> :
                    <span className="label label-default">{props.maxCP}</span>
                </div>
                <div className="resistant">
                    <span className="label label-success">Resistant</span> :
                    {props.resistant.map((el, index) =>
                        <span className="label label-default" key={index}>{el}</span>
                    )}
                </div>
                <div className="weaknesses">
                    <span className="label label-warning">Weaknesses</span> :
                    {props.weaknesses.map((el, index) =>
                        <span className="label label-default" key={index}>{el}</span>
                    )}
                </div>
                
                <button
                    type="button"
                    className="go-back btn btn-default"
                    onClick={props.onGoBack}
                    children='Go Back'
                />
            </div>
        </div>
    );
}

export default PokemonProfile;