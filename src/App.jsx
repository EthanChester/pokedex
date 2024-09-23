import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import PokemonInfo from "./PokemonInfo";
import DetailsModal from "./DetailsModal";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [shownPokemon, setShownPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const loadingData = useRef(false);
    const pokemonData = useRef([]);

    const numberOfPokemon = 151;

    useEffect(() => {
        async function getData() {
            loadingData.current = true;
            try {
                if (dataFetched.length < numberOfPokemon) {
                    const newDataFetched = []
                    for (let i = 1; i < numberOfPokemon + 1; i++) {
                        if (!(i in dataFetched)) {
                            let url = "https://pokeapi.co/api/v2/pokemon/" + i;
                            const response = await fetch(url);
                            if (!response.ok) {
                                console.log("failed to fetch", i);
                            } else {
                                const json = await response.json();
                                if (!(json in pokemonData.current)) {
                                    newDataFetched.push(i)
                                    pokemonData.current.push(json)
                                }
                            }
                        }
                    }
                    setDataFetched(...dataFetched, newDataFetched);
                }
                loadingData.current = false;
                setIsLoading(false);
                setShownPokemon([...pokemonData.current]);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        if (!loadingData.current) {
            getData();
        }
    }, [dataFetched]);

    useEffect(() => {
        if (pokemonData) {
            const filteredData = pokemonData.current.filter((item) => {
                return item.name.startsWith(searchTerm) || item.id === parseInt(searchTerm)
            });
            setShownPokemon(filteredData);
        }
    }, [searchTerm])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const openModal = (num) => {
        setSelectedPokemon(pokemonData.current.find(({ id }) => id === num));
        setModalOpen(true);
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
                        {selectedPokemon.abilities.map(function(element, i) {
                            return <p key={i}>- {element.ability.name}</p>
                        })}
                        <h3>Height: {parseInt(selectedPokemon.height) * 10} cm</h3>
                        <h3>Weight: {parseInt(selectedPokemon.weight) / 10} kg</h3>
                    </div>
                </div>
            : null}
            </DetailsModal>
            <header>
                <h1>Pokédex</h1>
                <input type="text" id="searchBar" placeholder="Search" onChange={e => setSearchTerm(e.target.value)} />
            </header>
            <body>
                <div className="pokemonInfoContainer">
                    {shownPokemon ? shownPokemon.map(function(object) {
                        return <PokemonInfo
                        key={object.id}
                        handleClick={openModal}
                        id={object.id}
                        name={object.name}
                        types={object.types}
                        height={object.height}
                        weight={object.weight}
                    />;
                    }): null}
                </div>
            </body>
        </div>
    );
}

export default App;
