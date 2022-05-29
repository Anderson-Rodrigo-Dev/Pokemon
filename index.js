const redPokemons = []


async function acessandoPokemon() {
    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150"
    const pokemons = await fetch(url)
    const listaPokemons = await pokemons.json()
    const resultado = listaPokemons.results

    resultado.forEach(pokemon => {
        redPokemons.push(pokemon.name)
    });
}

acessandoPokemon()

setTimeout(() => {
    const novosPokemons = redPokemons.filter(pokemons => pokemons.charAt(0) == 'h')

    console.log(novosPokemons)
}, 100);