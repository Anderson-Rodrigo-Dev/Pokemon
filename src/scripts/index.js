const quantidadePokemons = 150;
let pokemonsVisiveis = 15;
const listaPokemons = [];

document.querySelector("#select").addEventListener('change', function(){
    pokemonsVisiveis = 15
    filtrandoPokemons(true)
})

document.querySelector("#btn").addEventListener("click", function () {

  pokemonsVisiveis += 15;

  if (pokemonsVisiveis >= 150) {
    pokemonsVisiveis = 150;
    this.style.display = "none";
  }

  filtrandoPokemons();
});

async function acessandoPokemon() {
  const pokemons = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

  for (let i = 1; i <= quantidadePokemons; i++) {
    const lista = await fetch(pokemons(i));
    listaPokemons.push(await lista.json());
  }

  filtrandoPokemons(true)
}


 function filtrandoPokemons(limparLista = false) {
  let pokemonsFiltrados = Array.from(listaPokemons) 
  console.log(listaPokemons)
  

  if (select.value == "ordem-alfabetica") {
    pokemonsFiltrados.sort(function (a, b) {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }else if(select.value == 'tipos'){
    pokemonsFiltrados.sort(function (a, b) {
        return a.types[0].type.name < b.types[0].type.name ? -1 : a.types[0].type.name > b.types[0].type.name ? 1 : 0;
      });
  }

  const list = pokemonsFiltrados.slice(pokemonsVisiveis - 15, pokemonsVisiveis).reduce((acumulador, pokemon) => {
    const tipos = pokemon.types.map((typeInfo) => typeInfo.type.name);

    acumulador += `
            <li class="card ${tipos[0]}" id="card">
                <img class="card-image" alt="${pokemon.name}" src="${
      pokemon.sprites.front_default
    }" />
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${tipos.join(" | ")}</p>
            </li>
        `;
    return acumulador;
  }, "");

  const ul = document.querySelector('[data-js="pokedex"]');

  if (limparLista) ul.innerHTML = ''

  ul.innerHTML += list;
}

acessandoPokemon();

