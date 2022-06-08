const   quantidadePokemons = 150
let     pokemonsVisiveis = 15

document.querySelector("#btn").addEventListener('click', function () {
    

    acessandoPokemon()
})


async function acessandoPokemon() {
    const pokemons = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const listaPokemons = []

    
    for(let i = 1; i <= quantidadePokemons; i++){
        const lista = await fetch(pokemons(i))
        listaPokemons.push(await lista.json())
    }
    
    //Ordena os Pokemons em ordem alfabetica

    /* listaPokemons.sort(function(a,b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    listaPokemons.splice(pokemonsVisiveis) */

    

    const list = listaPokemons.reduce((acumulador, pokemon) =>{
        const tipos = pokemon.types.map(typeInfo => typeInfo.type.name)
        acumulador += `
            <li class="card ${tipos[0]}">
                <img class="card-imagem" alt="${pokemon.name}" src="${pokemon.sprites.front_default}" />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${tipos.join(" | ")}</p>
            </li>
        `
        return acumulador
    },'')

    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = list
}

acessandoPokemon()