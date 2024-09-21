import React, { useState } from "react";
import "./App.css";
import PokemonInfo from "./PokemonInfo";
import DetailsModal from "./DetailsModal";

function App() {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (id) => {
        console.log(id);
        setModalOpen(true);
    }

    return (
        <div className="App">
            <DetailsModal
                open={modalOpen}
                handleClick={() => setModalOpen(false)}
            >
                test
            </DetailsModal>
            <PokemonInfo handleClick={openModal} id={1} />
        </div>
    );
}

// document.getElementById('root') -> modal parent

export default App;
