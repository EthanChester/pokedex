import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import PokemonInfo from "./PokemonInfo";
import DetailsModal from "./DetailsModal";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const firstLoad = useRef(true);

    const numberOfPokemon = 151;

    useEffect(() => {
        async function getData() {
            try {
                if (dataFetched.length < numberOfPokemon) {
                    const data = []
                    const newDataFetched = []
                    for (let i = 1; i < numberOfPokemon + 1; i++) {
                        if (!(i in dataFetched)) {
                            let url = "https://pokeapi.co/api/v2/pokemon/" + i;
                            try {
                                const response = await fetch(url);
                                if (!response.ok) {
                                    console.log("failed to fetch", i);
                                } else {
                                    const json = await response.json();
                                    if (!(i in dataFetched)) {
                                        newDataFetched.push(i)
                                        data.push(json)
                                    }
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    setDataFetched(...dataFetched, newDataFetched);
                    setPokemonData(...pokemonData, data);
                }
                firstLoad.current = false;
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        if (firstLoad.current) {
            getData();
        }
    }, [dataFetched, pokemonData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const openModal = (num) => {
        setSelectedPokemon(pokemonData.find(({ id }) => id === num));
        setModalOpen(true);
        console.log(selectedPokemon);
    };

    return (
        <div className="App">
            <DetailsModal
                open={modalOpen}
                handleClick={() => setModalOpen(false)}
            > 
            {selectedPokemon ? 
                <div className="modalContent">
                    <img className="pokemonImage" src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} width='400' height='400'/>
                    <div>
                        <h2>
                        {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)} ({selectedPokemon.id})
                        </h2>
                        <h3>Abilities:</h3>
                        {selectedPokemon.abilities.map(function(element) {
                            return <p>- {element.ability.name}</p>
                        })}
                        <h3>Height: {parseInt(selectedPokemon.height) * 10} cm</h3>
                        <h3>Weight: {parseInt(selectedPokemon.weight) / 10} kg</h3>
                    </div>
                </div>
            : null}
            </DetailsModal>
            <header>
                <h1>Pokedex</h1>
                <input type="text" id="searchBar" placeholder="Search" />
            </header>
            <body>
                <div className="pokemonInfoContainer">
                    {pokemonData.map(function(object) {
                        return <PokemonInfo
                        key={object.id}
                        handleClick={openModal}
                        id={object.id}
                        name={object.name}
                        types={object.types}
                        height={object.height}
                        weight={object.weight}
                    />;
                    })}
                </div>
            </body>
        </div>
    );
}

export default App;
