const pokemonsDiv = document.querySelector(".pokemons");
const searchInput = document.querySelector("input");

const fetchPokemons = async () => {

    const pokemons = Array(150).fill();

    for (id = 1; id <= 151; id++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

        try {
            const pokemon = await fetch(url);
            const pokemonJson = await pokemon.json();

            pokemons[id-1] = pokemonJson;
        } catch (error) {
            console.log(error);
        }

    };

    return pokemons;
};

const putPokemons = async () => {

    const pokemons = await fetchPokemons();

    pokemons.map(pokemon => {

        let typesDivs = "";
        const { id, name, types } = pokemon;

        types.map( type => typesDivs += `<div class="${type.type.name}"> <p>${type.type.name}</p> </div>` );
            
        pokemonsDiv.innerHTML +=
            `<div class="pokemon">
                <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="A ${name} image">
                <span>Nº ${id}</span>
                <h1>${name}</h1>
                <div class="types">
                    ${typesDivs}
                </div>
            </div>`;
        
    } );

};

const searchPokemons = () => {

    const pokemonsDivs = document.querySelectorAll(".pokemon");
    
    pokemonsDivs.forEach( element => {
        const pokemonName = element.children[2].innerHTML;
        const inputValue = searchInput.value.toLowerCase();
        const inputValueLength = inputValue.length;

        if ( inputValue == pokemonName.slice(0, inputValueLength) ) {
            element.style.display = "flex"
        } else {
            element.style.display = "none"
        }
    });
}

putPokemons();
searchInput.addEventListener("input", searchPokemons);