function PokemonInfo({ id, name, types, height, weight, handleClick }) {
    return (
        <button onClick={() => handleClick(id)}>
            <p>{id}</p>
            <p>{name}</p>
            {/* <p>{types}</p> */}
            <p>{height}</p>
            <p>{weight}</p>
        </button>
    );
}

export default PokemonInfo;
