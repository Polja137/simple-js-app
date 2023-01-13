/*Defined an empty array*/
let pokemonList = [];

/*Defined new objects and added them to an array*/

let bulbasaur = {
    name: 'bulbasaur',
    height: 0.7,
    type: ['grass', 'poison']
  };

  let pikachu = {
    name: 'pikachu',
    height: 0.4,
    type: ['electric']
  };

  let clefable = {
    name: 'clefable',
    height: 1.3,
    type: ['fairy']
  };

  pokemonList[0] = bulbasaur;
  pokemonList[1]=pikachu;
  pokemonList[2]=clefable;


/*replace for loop for forEach loop*/
pokemonList.forEach (function(pokemon) {
  if (pokemon.height >=5) {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - Wow, that is a big pokemon!" + "<br>")
  } else if (pokemon.height >= 1 && pokemon.height < 5) {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a medium pokemon!" + "<br>")
  } else {
      document.write(pokemon.name + " (height: " + pokemon.height + "m) - That is a small pokemon!" + "<br>")
  }
//      console.log(pokemon);
  });