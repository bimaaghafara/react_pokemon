import React, {Component, useState, useEffect } from 'react';

// components
import Loader from '../components/loader';
import PokemonCard from '../components/pokemon-card';

// 3rd lib
import gql from 'graphql-tag';
import { ApolloConsumer } from '@apollo/react-hooks';

class PokemonList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            count: 10,
            pokemons: [],
            nextPokemons: [],
            fetchingNextPokemons: false,
            endOfCatalogue: false
        };
        
        this.handleScroll = this.handleScroll.bind(this);
    };

    componentDidMount() {
        // get pokemons from sessionStorage
        const pokemons = JSON.parse(sessionStorage.getItem('pokemons'));

        if (pokemons.length) {
            this.setState({pokemons: pokemons})
        } else {
            // get pokemons for the first time
            this.getPokemons(this.state.count);
        }
        document.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        // set pokemons into sessionStorage
        sessionStorage.setItem('pokemons', JSON.stringify(this.state.pokemons));

        document.removeEventListener('scroll', this.handleScroll);
    }

    async handleScroll() {
        // isNearBottom = true; when user reach to 375px (about 1 product wrapper height) from bottom page
        const isNearBottom = window.innerHeight + window.scrollY >= (document.body.offsetHeight) - 315;
        if (isNearBottom) {
            if (this.state.nextPokemons.length>0) {
                // update more pokemons when nextPokemons is exist
                await this.setState({pokemons: this.state.nextPokemons})

                // reset nextPokemons after we add them, to prevent add more nextPokemons with same nextPokemons
                await this.setState({nextPokemons: []})

            } else if (!this.state.endOfCatalogue && this.state.fetchingNextPokemons) {
                // when user isNearBottom but app isFetchingNextPokemons, app will show loader
                // try to scroll down so fast into isNearBottom
                // show loader here
                // loader will be hidden when get pokemons is done
                this.setState({loader: true});
            }
        }

        // getNextPokemons when showLoading=false, isFetchingNextPokemons=false, nextPokemons=[], and endOfCatalogue=false;
        if (!this.state.loader && !this.state.fetchingNextPokemons && this.state.nextPokemons.length===0 && !this.state.endOfCatalogue) {
            this.getNextPokemons(this.state.count);
        }
    }

    getPokemons = (first) => {
        this.setState({loader: true});
        this.props.client.query({
            query: this.GET_POKEMONS,
            variables: {first: first}
        })
        .then(data => {
            this.setState({
                loader: false,
                pokemons: data.data.pokemons,
                count: this.state.count+10
            });

            // scroll down & up window by 10px, to trigger handleScroll()
            window.scrollBy(0, 10);
            window.scrollBy(0, -10);
        })
        .catch(error => {
            this.setState({loader: false});
            console.error(error);
        });
    }

    getNextPokemons = (first) => {
        this.setState({fetchingNextPokemons: true});
        this.tes = this.props.client.query({
            query: this.GET_POKEMONS,
            variables: {first: first}
        })
        .then(data => {
            this.setState({
                loader: false,
                fetchingNextPokemons: false,
                nextPokemons: data.data.pokemons,
                count: this.state.count+10,
                endOfCatalogue: data.data.pokemons.length===this.state.pokemons.length? true: false
            });

            // scroll down & up window by 10px, to trigger handleScroll()
            window.scrollBy(0, 10);
            window.scrollBy(0, -10);
        })
        .catch(error => {
            this.setState({loader: false});
            console.error(error);
        });
    }

    // query fro graphql
    GET_POKEMONS = gql`
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

    goToPage = (url) => {
        this.props.history.push(url);
    }

    render() {
        const {loader, pokemons} = this.state;
    
        return (
            <div className="container">
                <Loader visible={loader}></Loader>
                
                <div className="col-xs-12">
                    <h1>Pokemon List</h1>
                </div>

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
                                onClick={() => this.goToPage(`/pokemon/${pokemon.id}`)}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }

}

const PokemonListWrapper = (props) => <ApolloConsumer>
    {client => <PokemonList {...props} client={client}></PokemonList>}
</ApolloConsumer>

export default PokemonListWrapper;