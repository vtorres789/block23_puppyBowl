const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 *live server
*/

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL + 'players');
        const json = await response.json();
        // console.log(json.data.players);
        return json.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const result = await fetch(`${APIURL}/${id}`);
        const player = await result.json();
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

// ADDING A NEW PLAYER

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-PT-WEB-PT-A/players', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Rufus',
                breed: 'Irish Setter',
            }),
        });
        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

// DELETE PLAYER

const removePlayer = async (playerId) => {
    console.log('deleting ' + id);
    try {
        const requestOptions = {
            method: 'DELETE'
          }
          const response = await fetch(`${APIURL}/${id}`, requestOptions);
          const player = await response.json();
          return player;
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        playerListContainer.innerHTML = '';
        players.forEach((player) => {
          const playerElement = document.createElement('div');
          playerElement.classList.add('player');
          playerElement.style.backgroundColor = getRandomColor()
          playerElement.innerHTML = `
                    <h2>${players.name}</h2>
                    <p>${players.breed}</p>
                    <p>${players.status}</p>
                    <p>${players.teamId}</p>
                    <p>${players.cohortId}</p>
                    <button class="details-button" data-id="${player.id}">See Details</button>
                    <button class="delete-button" data-id="${player.id}">Delete</button>
                `;
          playerListContainer.appendChild(playerElement);
    
          // see details
          const detailsButton = partyElement.querySelector('.details-button');
          detailsButton.addEventListener('click', async (event) => {
            // get the id
            const playerId = event.target.dataset.id
            // send id to renderSinglePartyById function
            renderSinglePartyById(partyId)
          });
    
          // delete party
          const deleteButton = partyElement.querySelector('.delete-button');
          deleteButton.addEventListener('click', async (event) => {
            // get the id
            const partyId = event.target.dataset.id
            // pass the id to deleteParty function
            deleteParty(partyId)
            // get it off the page
            event.target.closest('div.party').remove()
          });
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
/* const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
} */

const renderNewPlayerForm = () => {
    try {
      // Create a new form element
      const form = document.createElement("form");
  
      // Set the form's action to the URL of the page that will handle the form submission
      form.action = "/players/new";
  
      // Add some input fields to the form
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.name = "name";
  
      const emailInput = document.createElement("input");
      emailInput.type = "email";
      emailInput.name = "email";
  
      // Append the input fields to the form
      form.appendChild(nameInput);
      form.appendChild(emailInput);
  
      // Add a submit button to the form
      const submitButton = document.createElement("button");
      submitButton.type = "submit";
      submitButton.textContent = "Submit";
  
      // Append the submit button to the form
      form.appendChild(submitButton);
  
      // Append the form to the DOM
      document.body.appendChild(form);
    } catch (err) {
      console.error('Uh oh, trouble rendering the new player form!', err);
    }
  }

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();