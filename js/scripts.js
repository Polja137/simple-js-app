let pokemonRepository = (function() {
  //pokemon array
  let pokemonList = [];

  let printedList = document.querySelector('.pokemon-list');
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let inputField = document.querySelector('.search');
  let pokemonModal = document.querySelector('.modal-dialog');

  //function to add new pokemon to the pokemonList array via push (append the existing array). Check that the input is an object.
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      Object.keys(pokemon).includes('name' && 'detailsUrl')
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error(
        'Pokémon has to be added using this format: {name:, detailsUrl:}'
      );
    }
  }

// Called in case of loading error and while executing search
function removeList() {
  printedList.innerHTML = '';
}

// Called in case of loading error and when manually hiding modal
function hideModal() {
  pokemonModal.classList.add('hidden');
}

function showErrorMessage(message) {
  let errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.classList.add('col-6');
  errorMessage.innerText = message;

  printedList.appendChild(errorMessage);
}

  //loadList function gets the pokemon list from the pokeAPI
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      //forEach loop to get the name and detail URL from the pokeAPI response
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        //calls the add function to add the "items"/pokemon to the pokemonList array
        add(pokemon);
      });
      //if error log to the console
    }).catch(function(e) {
      console.error(e);
    })
  }

  //Add pokemon to the list
  function addListPokemon(pokemon) {
    // Details have to be loaded to be able to use frontImageUrl
    loadDetails(pokemon).then(function () {
      let listPokemon = document.createElement('li');
      listPokemon.classList.add('col');

      let button = document.createElement('button');
      let buttonText = document.createElement('h2');
      button.appendChild(buttonText);
      buttonText.innerText =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      button.classList.add('pokemon-button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '.modal');

      let pokemonImage = document.createElement('img');
      pokemonImage.src = pokemon.frontImageUrl;
      button.appendChild(pokemonImage);

      listPokemon.appendChild(button);
      printedList.appendChild(listPokemon);

      // Triggering showDetails() of respective Pokemon upon button click
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    });
  }

  //getAll function to return all of the items in the pokemonList array
  function getAll() {
    return pokemonList;
  }

  // Search box 
  function filterPokemons(query) {
    return pokemonList.filter(function (pokemon) {
      // toLowerCase() method to make input not case-sensitive
      let pokemonLowerCase = pokemon.name.toLowerCase();
      let queryLowerCase = query.toLowerCase();
      return pokemonLowerCase.startsWith(queryLowerCase);
    });
  }

  inputField.addEventListener('input', function () {
    let query = inputField.value;
    let filteredList = filterPokemons(query);
    removeList();
    if (filteredList.length === 0) {
      showErrorMessage(
        'Sorry. There are no Pokémon matching your search criteria.'
      );
    } else {
      filteredList.forEach(addListPokemon);
    }
  });

  //loadList function gets the pokemon list from the pokeAPI
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingSpinner(spinnerLocation);
        pokemonArray = json.results;
        pokemonArray.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        //hideLoadingSpinner(spinnerLocation);
        removeList();
        hideModal();
        showErrorMessage(
          "There don't seem to be any Pokémon around. If you are not offline, try again later."
        );
        console.error(e);
      });
  }

  //loads the details of the pokemon from the detailsUrl call
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Adding details to Pokemon by defining pokemon object-keys.
        pokemon.frontImageUrl = details.sprites.front_default;
        pokemon.backImageUrl = details.sprites.back_default;
        pokemon.height = details.height;

        let arrayOfTypes = [];
        details.types.forEach(function (item) {
          arrayOfTypes.push(item.type.name);
        });
        // Defining separator between printed array items
        pokemon.types = arrayOfTypes.join(', ');

        let arrayOfAbilities = [];
        details.abilities.forEach(function (item) {
          arrayOfAbilities.push(item.ability.name);
        });
        pokemon.abilities = arrayOfAbilities.join(', ');
      })
      .catch(function (e) {
        hideLoadingSpinner(spinnerLocation);
        console.error(e);
      });
  }


 
  

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
        showModal(pokemon.name,pokemon.name + "'s height is: " + pokemon.height, pokemon.imageURL);
      });
    }

    // Function to be called upon clicking Pokemon buttons: 1. Fetching Pokemon details and then 2. open modal with details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector('.modal-title');
      let modalBody = document.querySelector('.modal-body');

      // Clearing previous modal content
      modalTitle.innerHTML = '';
      modalBody.innerHTML = '';

      // Creating modal content elements
      let nameElement = document.querySelector('.modal-title');
      nameElement.innerText =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

      let imageElementFront = document.createElement('img');
      imageElementFront.classList.add('modal-img');
      imageElementFront.src = pokemon.frontImageUrl;

      let imageElementBack = document.createElement('img');
      imageElementBack.classList.add('modal-img');
      imageElementBack.src = pokemon.backImageUrl;

      let modalText = document.createElement('div');
      modalText.classList.add('modal-text');

      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + pokemon.height / 10 + ' m';

      let typesElement = document.createElement('p');
      typesElement.innerText = 'Types: ' + pokemon.types;

      let abilitiesElement = document.createElement('p');
      abilitiesElement.innerText = 'Abilities: ' + pokemon.abilities;

      modalBody.appendChild(imageElementFront);
      modalBody.appendChild(imageElementBack);
      modalBody.appendChild(modalText);
      modalText.appendChild(heightElement);
      modalText.appendChild(typesElement);
      modalText.appendChild(abilitiesElement);
    });
  }

  // Hiding modal using Escape key.
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hideModal();
    }
  });


    return {
      add: add,
      removeList:removeList;
      hideModal:hideModal;
      getAll: getAll,
      addListPokemon: addListPokemon,
      loadList: loadList,
      loadDetails: loadDetails,
      showErrorMessage:showErrorMessage,
      filterPokemons:filterPokemons,
      showDetails:showDetails
    };
  })();

pokemonRepository.loadList().then(function() {
  //go to the pokemonRepository variable which should return the pokemon list via .gitAll*key is it's a funciton needs () and perform a forEach loop through each parameter of the pokemonRepo
 pokemonRepository.addListPokemon(pokemon);}
 pokemonRepository.getAll().forEach(printList);
});