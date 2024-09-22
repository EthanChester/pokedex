function PokemonInfo({ id, name, types, height, weight, handleClick }) {
    types = types.map(element => element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1));
    const typesString = types.join(', ');
    return (
        <button onClick={() => handleClick(id)} className="pokemonInfo">
            <h3>{name.charAt(0).toUpperCase() + name.slice(1)} ({id})</h3>
            <p>Types: {typesString}</p>
            <p>Height: {parseInt(height) * 10} cm</p>
            <p>Weight: {parseInt(weight) / 10} kg</p>
        </button>
    );
}

export default PokemonInfo;
