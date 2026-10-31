
const input = document.getElementById('input-user');
const imgPokemon = document.getElementById('img-pokemon');
const namePokemon = document.getElementById('name-pokemon');
const grid = document.getElementById('grid');

let pokemonList = [];



input .addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        getPokemon();
    }
});

async function getPokemon() { 
    const pokemonName = input.value;
    let exists = checkPokemon(pokemonName);
    if(exists == true){
        return;
    }

    try{
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName);
        const data = await response.json();
        savePokemon(data);
        show(data);
    }catch(error){
        console.log(error);
        console.error('Error fetching Pokémon data:', error);
    }
}

function show(){
//    for(pokemon of pokemonList){
//       createCard(pokemon);
//   }
    createCard(pokemonList[pokemonList.length - 1]);
}

function savePokemon(data){
    let newPokemon = {
    id: data.id,
    nome: data.name,
    img_front: data.sprites.front_default,
    img_back: data.sprites.back_default,
}
    pokemonList.push(newPokemon);
    console.log(pokemonList);
}

function checkPokemon(pokemonName){
    for(pokemon of pokemonList){
        if(pokemonName == pokemon.id || pokemonName == pokemon.nome){
            return true;
        }
    }
    return false;
}

function createCard(pokemon){
    // Cria o texto e a imagem do Pokémon
    const newText = document.createElement('p');
    const newImg = document.createElement('img');

    // Define o src da imagem e o  valor do texto do nome do Pokémon
    newImg.src = pokemon.img_front;
    newText.textContent = pokemon.nome;

    // Cria uma div e adiciona a imagem e o texto como filhos, inserindo dentro da div
    const newDiv = document.createElement('div');
    newDiv.appendChild(newImg);
    newDiv.appendChild(newText);
    newDiv.classList.add('card-pokemon');
    grid.appendChild(newDiv);
}
