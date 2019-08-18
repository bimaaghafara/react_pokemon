import React, { Fragment } from 'react';
import './loader.scss';

function loader(props) {
    return (
        <Fragment>
            {props.visible &&
                <div className="loader">
                    <div className="loader-wheel"></div>
                    <div className="loader-text"></div>
                </div>
            }
        </Fragment>
    );
}

export default loader;