import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonInfo from "./PokemonInfo";
import DetailsModal from "./DetailsModal";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [error, setError] = useState(null);
    const [dataFetched, setDataFetched] = useState([]);

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
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const openModal = (id) => {
        console.log(id);
        setModalOpen(true);
    };

    return (
        <div className="App">
            <h1>Title</h1>
            <DetailsModal
                open={modalOpen}
                handleClick={() => setModalOpen(false)}
            >
                test
            </DetailsModal>
            <div>
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
        </div>
    );
}

export default App;
