/*define new variable and wrap in IIFE to eliminate code from global use */

let pokemonRepository = (function() {
  let pokemonList = []
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon)
  {
    pokemonList.push(pokemon)
  }
  /*{
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
  }*/

  function getAll() {
    return pokemonList;
  }

  /*function showDetails(pokemon) {
    console.log(pokemon);
  }*/
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
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

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList:loadList,
    loadDetails:loadDetails
  };

}) ();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
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
