import React, { useState, useEffect } from 'react';

// components
import Loader from '../components/loader';
import PokemonProfile from '../components/pokemon-profile';

// 3rd lib
import gql from 'graphql-tag';
import { ApolloConsumer } from '@apollo/react-hooks';

function PokemonDetail(props) {
    // component state: [key: setter] = useState(defaultValue);
    const [pokemon, setPokemon] = useState();
    const [loader, setLoader] = useState(true);

    // Similar to componentDidMount
    useEffect(() => {
        getPokemon(props.match.params.id);
    }, []);

    const getPokemon = (id) => {
        props.client.query({
            query: GET_POKEMON,
            variables: {id: id}
        }).then(data => {
            setLoader(false);
            setPokemon(data.data.pokemon);
        }).catch(error => {
            setLoader(false);
            console.error(error)
        });
    }

    // query fro graphql
    const GET_POKEMON = gql`
        query Pokemon($id: String!) {
            pokemon(id: $id) {
                id
                number
                name
                image
                classification
                types
                maxCP
                maxHP
                resistant
                weaknesses
            }
        }
    `;

    return (
        <div className="container">
            <Loader visible={loader}></Loader>

            <div className="col-xs-12">
                <h1>Pokemon Detail</h1>
            </div>

            <div className="col-xs-12">
                {pokemon &&
                    <PokemonProfile
                        id={pokemon.id}
                        number={pokemon.number}
                        name={pokemon.name}
                        image={pokemon.image}
                        classification={pokemon.classification}
                        types={pokemon.types}
                        maxCP={pokemon.maxCP}
                        maxHP={pokemon.maxHP}
                        resistant={pokemon.resistant}
                        weaknesses={pokemon.weaknesses}
                        onGoBack={() => props.history.goBack()}
                    />
                }
            </div>
        </div>
    );
}

const PokemonDetailWrapper = (props) => <ApolloConsumer>
    {client => <PokemonDetail {...props} client={client}></PokemonDetail>}
</ApolloConsumer>

export default PokemonDetailWrapper;