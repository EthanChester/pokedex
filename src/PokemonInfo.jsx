function PokemonInfo({ id, handleClick }) {
    return (
        <button onClick={() => handleClick(id)}>
            <p>001</p>
            <p>Bulbasaur</p>
            <p>Type</p>
            <p>Height</p>
            <p>Width</p>
        </button>
    );
}

export default PokemonInfo;
