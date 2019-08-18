import React, { Fragment } from 'react';

function PokemonDetail(props) {
    return (
        <Fragment>
            PokemonDetail #{props.match.params.id}
        </Fragment>
    );
}

export default PokemonDetail;