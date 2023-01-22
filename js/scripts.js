/*define new variable and wrap in IIFE to eliminate code from global use */

let pokemonRepository = (function() {
  let pokemonList = [
    { name: "Bulbasaur", type: ["grass", "poison"], height: 0.7 },
    { name: "Pikachu", type: ["electic"], height: 0.4},
    { name: "Clefable", type: ["fairy"], height: 1.3},
    { name: "Hypno", type: ["psychic"], height: 1.6},
    { name: "Jynx", type: ["psychic","ice"], height: 1.4 }
  ]

  function add(pokemon){
    if (
    typeof pokemon === "object" &&
    "ID" in pokemon &&
    "name" in pokemon &&
    "type" in pokemon &&
    "height" in pokemon &&
    "ability" in pokemon
  ) {
   pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addListItem (pokemon) {
    let repository = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    //added event listener: returns all pokemon info to console when button is clicked
    button.addEventListener("click", (Event) => showDetails(pokemon));
    listPokemon.appendChild(button);
    repository.appendChild(listPokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

}) ();




pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});


/*not in use anymore
pokemonRepository.getAll().forEach(function(pokemon) {
let elements=document.querySelectorAll('.pokemon-list')

  if (pokemon.height >=5) {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - It's a big pokemon!" + "<br>")
  } else if (pokemon.height >= 1 && pokemon.height < 5) {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - It's a medium pokemon!" + "<br>")
  } else {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - It's a small pokemon!" + "<br>")
  }
//      console.log(pokemon);
  });
*/
