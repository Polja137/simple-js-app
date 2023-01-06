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


  /* tell 'for-loop' code to look to length of variable array above first */
for (let i=0; i < pokemonList.length; i++){
    /* set condition for specific key-value of objects in array */
      if (pokemonList[i].height >= 1){
        console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
    /* inserted html break line tag to display each object on a new line  */
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!" + "<br>");
    /* only need to use 'else' rather than 'else-if' as we want the output to be on just one object  */
    } else {
        console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
    /* inserted html break line tag to display each object on a new line  */
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "<br>")
    }
    }