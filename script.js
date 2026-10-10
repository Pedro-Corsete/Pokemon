const input = document.getElementById("input-user");
const imgPokemon = document.getElementById("img-pokemon");
const namePokemon = document.getElementById("name-pokemon");
const grid = document.getElementById("grid");

let pokeList = [];

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getPokemon();
    }
});

async function getPokemon() {
    const pokemonName = input.value.toLowerCase().trim();
    
    if (!pokemonName) return;

    let exists = checkPokemon(pokemonName);
    if (exists) {
        alert("Este Pokémon já foi buscado!");
        return;
    }

    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/" + pokemonName
        );
        
        if (!response.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const data = await response.json();

        addToPokeList(data);
        
        show(data);

    } catch (error) {
        console.log(error);
        alert("Pokémon não encontrado.");
    }
}

function addToPokeList(data) {
    let newPokemonObj = {
        id: data.id,
        name: data.name,
        img_front: data.sprites.front_default,
        img_back: data.sprites.back_default,
    };
    pokeList.push(newPokemonObj);
    console.log(pokeList);
}

function checkPokemon(pokemonName) {
    for (let pokemon of pokeList) {
        if (pokemonName == pokemon.id || pokemonName == pokemon.name) {
            return true;
        }
    }
    return false;
}

function show() {
    createCard(pokeList[pokeList.length -1]);
}

function createCard(pokemon){
    const newText = document.createElement("p");
    const newImg = document.createElement("img");

    newText.textContent = pokemon.name;
    newImg.src  = pokemon.img_front;

    const newDiv = document.createElement("div");
    newDiv.appendChild(newImg);
    newDiv.appendChild(newText);

    newDiv.classList.add("card-pokemon");
    grid.appendChild(newDiv);
}