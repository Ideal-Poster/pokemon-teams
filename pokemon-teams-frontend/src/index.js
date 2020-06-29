const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let mainElement = document.querySelector("main");

function reqTrainers() {
  fetch(`${TRAINERS_URL}`)
  .then(res => res.json())
  .then(json => renderTrainers(json))
}

function renderTrainers(trainers) {
  mainElement.innerHTML = "";
  trainers.forEach((trainer, i) => {
    let pokemonList = trainer.pokemons.map(({nickname, species, id}) => {      
      return `<li>${nickname} (${species}) <button class="release" data-pokemon-id="${id}">Release</button></li>`
    }).join("\n")

    mainElement.insertAdjacentHTML("beforeend", `
      <div class="card" data-id=${i}>
      <button class="add-pokemon" data-trainer-id="${i + 1}">Add Pokemon</button>
        <h2>${trainer.name}</h2>
        <ul>${pokemonList} </ul>
      </div>
    `)
  });
}

function createPokemon(trainerId) {
  fetch(`${POKEMONS_URL}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': trainerId
    })
  })
}

function deletePokemon(pokemonId) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: "DELETE" })
}


mainElement.addEventListener('click', ({target: {className}, target: {dataset}}) => {
  if (className.includes('release')) {
    confirm("Are You sure?") ? deletePokemon(dataset.pokemonId) : null
  }

  if (className.includes('add-pokemon')) {
    createPokemon(dataset.trainerId)
  }
})

reqTrainers()