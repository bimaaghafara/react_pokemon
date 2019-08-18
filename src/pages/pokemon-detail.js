import React, { Fragment, useState, useEffect } from 'react';

// 3rd lib
import gql from 'graphql-tag';
import { ApolloConsumer } from '@apollo/react-hooks';

function PokemonDetail(props) {
    // component state: [key: setter] = useState(defaultValue);
    const [pokemon, setPokemon] = useState([]);

    // Similar to componentDidMount
    useEffect(() => {
        getPokemon(props.match.params.id);
    }, []);

    const getPokemon = (id) => {
        console.log('loading...');
        props.client.query({
            query: GET_POKEMON,
            variables: {id: id}
        })
        .then(data => {setPokemon(data.data.pokemon); console.log(data);})
        .catch(error => console.error(error));
    }

    // query fro graphql
    const GET_POKEMON = gql`
        query Pokemon($id: String!) {
            pokemon(id: $id) {
                id
                name
            }
        }
    `;

    return (
        <Fragment>
            PokemonDetail!
            {pokemon &&
                <div>
                    #{pokemon.id} {pokemon.name}
                </div>
            }
        </Fragment>
    );
}

const PokemonDetailWrapper = (props) => <ApolloConsumer>
    {client => <PokemonDetail {...props} client={client}></PokemonDetail>}
</ApolloConsumer>

export default PokemonDetailWrapper;