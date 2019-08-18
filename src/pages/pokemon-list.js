import React, { Fragment, useState, useEffect } from 'react';

// 3rd lib
import gql from 'graphql-tag';
import { ApolloConsumer } from '@apollo/react-hooks';


function PokemonList(props) {
    // component state: [key: setter] = useState(defaultValue);
    const [pokemons, setPokemons] = useState([]);

    // Similar to componentDidMount
    useEffect(() => {
        getPokemons(11);
    }, []);


    const getPokemons = (first) => {
        console.log(pokemons);
        console.log('loading...');
        props.client.query({
            query: GET_POKEMONS,
            variables: {first: first}
        })
        .then(data => {setPokemons(data.data.pokemons); console.log(data.data.pokemons);})
        .catch(error => console.error(error));
    }

    // query fro graphql
    const GET_POKEMONS = gql`
        query Pokemons($first: Int!) {
            pokemons(first: $first) {
                id
                name
            }
        }
    `;

    return (
        <Fragment>
            PokemonList!
            {pokemons.map(pokemon =>
                <div key={pokemon.id}>
                    #{pokemon.id} - {pokemon.name}
                </div>
            )}
        </Fragment>
    );
}

const PokemonListWrapper = () => <ApolloConsumer>
    {client => <PokemonList client={client}></PokemonList>}
</ApolloConsumer>

export default PokemonListWrapper;