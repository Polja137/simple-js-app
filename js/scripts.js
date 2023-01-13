/*define new variable and wrap in IIFE to eliminate code from global use */
let pokemonRepository = (function() {

  let pokemonList = [
    { ID: "1", name: "Bulbasaur", type: ["grass", "poison"], height: 0.7 },
    { ID: "2", name: "Pikachu", type: ["electic"], height: 0.4},
    { ID: "3", name: "Clefable", type: ["fairy"], height: 1.3},
    { ID: "4", name: "Hypno", type: "psychic", height: 1.6},
    { ID: "5", name: "Jynx", type: ["psychic","ice"], height: 1.4 }]
   
  function add(pokemon){
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };

}) ();


/*replace for loop for forEach loop*/
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >=5) {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - It's a big pokemon!" + "<br>")
  } else if (pokemon.height >= 1 && pokemon.height < 5) {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - It's a medium pokemon!" + "<br>")
  } else {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - It's a small pokemon!" + "<br>")
  }
//      console.log(pokemon);
  });
