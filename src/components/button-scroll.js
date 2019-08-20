import React from 'react';
import './button-scroll.scss';

function buttonScroll(props) {
    return (
        <div className="button-scroll">
            <a className="float up" onClick={props.onClickUp}>
                <span className="glyphicon glyphicon-arrow-up"></span>
            </a>
            <a className="float down" onClick={props.onClickDown}>
                <span className="glyphicon glyphicon-arrow-down"></span>
            </a>
        </div>
    );
}

export default buttonScroll;