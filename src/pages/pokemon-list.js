import React, { useState, useEffect } from 'react';

// components
import Loader from '../components/loader';
import PokemonCard from '../components/pokemon-card';

// 3rd lib
import gql from 'graphql-tag';
import { ApolloConsumer } from '@apollo/react-hooks';


function PokemonList(props) {
    // component state: [key: setter] = useState(defaultValue);
    const [pokemons, setPokemons] = useState([]);
    const [loader, setLoader] = useState(true);

    // Similar to componentDidMount
    useEffect(() => {
        getPokemons(11);
    }, []);

    const getPokemons = (first) => {
        props.client.query({
            query: GET_POKEMONS,
            variables: {first: first}
        })
        .then(data => {
            setLoader(false);
            setPokemons(data.data.pokemons);
        })
        .catch(error => {
            setLoader(false);
            console.error(error);
        });
    }

    // query fro graphql
    const GET_POKEMONS = gql`
        query Pokemons($first: Int!) {
            pokemons(first: $first) {
                id
                number
                name
                image
                classification
                types
            }
        }
    `;

    const goToPage = (url) => {
        props.history.push(url);
    }

    return (
        <div className="container">
            <Loader visible={loader}></Loader>

            <h1>Pokemon List</h1>

            {pokemons.map(pokemon =>
                <div key={pokemon.id}>
                    <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3 well-sm">
                        <PokemonCard
                            id={pokemon.id}
                            number={pokemon.number}
                            name={pokemon.name}
                            image={pokemon.image}
                            classification={pokemon.classification}
                            types={pokemon.types}
                            onClick={() => goToPage(`/pokemon/${pokemon.id}`)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

const PokemonListWrapper = (props) => <ApolloConsumer>
    {client => <PokemonList {...props} client={client}></PokemonList>}
</ApolloConsumer>

export default PokemonListWrapper;