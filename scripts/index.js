const pokemonsDiv = document.querySelector(".pokemons");

const fetchPokemons = async () => {

    allPokemons = [];

    for (id = 1; id <= 150; id++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        
        try {
            const pokemon = await fetch(url)
            const pokemonJson = await pokemon.json()
            const { id, name , types } = pokemonJson
            
            putPokemons(id, name, types)
        } catch (error) {
            console.log(error)
        }
        
    };

    return allPokemons;
};

const putPokemons = async (id, name, types) => {
    console.log(id);
    let typesDivs = "";

    for (eachType of types) {
        typesDivs += `<div class="${eachType.type.name}">
                    <p>${eachType.type.name}</p>                      
                    </div>`
    };
    
    pokemonsDiv.innerHTML +=
        `<div class="pokemon">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="A ${name} image">
            <span>Nº ${id}</span>
            <h1>${name}</h1>
            <div class="types">
                ${typesDivs}
            </div>
        </div>`;
};

fetchPokemons();