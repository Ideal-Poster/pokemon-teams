const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let mainElement = document.querySelector("main");

function reqTrainers() {
  fetch(`${BASE_URL}/trainers`)
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
      <button class="add-pokemon" data-trainer-id="${i}">Add Pokemon</button>
        <h2>${trainer.name}</h2>
        <ul>${pokemonList} </ul>
      </div>
    `)
  });
}

mainElement.addEventListener('click', e => {
  if (e.target.className.includes('release')) {
    alert("are you sure?")
    fetch(`${BASE_URL}/pokemons/${e.target.dataset.pokemonId}`, { method: "DELETE" })
  }

  if (e.target.className.includes('add-pokemon')) {
    console.log(e.target.dataset.trainerId);
    
    fetch(`${BASE_URL}/pokemons`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'trainer_id': (parseInt(e.target.dataset.trainerId) + 1)
      })
    })
  }
})

reqTrainers()