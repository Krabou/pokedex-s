const btnLeft = document.querySelector(".left-button");
const btnRight = document.querySelector(".right-button");
const infos = document.querySelector(".infos");
const list = document.getElementById("list");
var count = 0;
var countId = 0;
var POKURL = `https://pokeapi.co/api/v2/pokemon?offset=${countId}&limit=20`;

function start() {

  fetch(POKURL)
    .then((res) =>
      res.json()
    )
    .then(data => {
      display(data.results)
    })
    .catch((err) => console.error(err))
}

start();

function display(pokemons) {

  list.innerHTML = "";

  pokemons.forEach((pokemon) => {
    var index = pokemons.indexOf(pokemon) + 1 + count;
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    list.innerHTML += ` <div class="list-item" data-url=${pokemon.url}>${index}. ${name}</div>`;
  });

  const listItem = list.querySelectorAll(".list-item");
  listItem.forEach((item) => (item.onclick = displayInfo))

  btnLeft.onclick = () => {
    decrementCountId();
    start()
  };
  btnRight.onclick = () => {
    incrementCountId();
    start()
  };

}

function decrementCountId(id) {
  if (countId != 0) {
    countId -= 20;
    count -= 20;
  }
  return POKURL = `https://pokeapi.co/api/v2/pokemon?offset=${countId}&limit=20`
}

function incrementCountId() {
  countId += 20;
  count += 20;
  return POKURL = `https://pokeapi.co/api/v2/pokemon?offset=${countId}&limit=20`
}

function displayInfo(e) {
  const URLItem = e.target.getAttribute("data-url");

  fetch(URLItem)
    .then((res) => res.json())
    .then((data) => {
      var pokemonId = ""
      if (data.id < 10) {
        pokemonId = `00${data.id}`
      } else if (data.id < 100) {
        pokemonId = `0${data.id}`
      } else {
        pokemonId = `${data.id}`
      }

      infos.className = `main-screen ${data.types[0].type.name}`;
      const name = data.name[0].toUpperCase() + data.name.slice(1);
      const type1 = data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);

      var type = (!data.types[1]) ? `<span class="poke-type-one">${type1}</span>` : `<span class="poke-type-one">${type1}</span>
<span class="poke-type-two">${data.types[1].type.name[0].toUpperCase() + data.types[1].type.name.slice(1)}</span>`

      infos.innerHTML = `
        <div class="screen__header">
        <span class="poke-name">${name}</span>
        <span class="poke-id">#${pokemonId}</span>
      </div>
      <div class="screen__image">
        <img src="${data.sprites.front_default}" class="poke-front-image" alt="front">
        <img src="${data.sprites.back_default}" class="poke-back-image" alt="back">
      </div>
      <div class="screen__description">
        <div class="stats__types">
        ${type}
        </div>
        <div class="screen__stats">
          <p class="stats__weight">
            weight: <span class="poke-weight">${data.weight}</span>
          </p>
          <p class="stats__height">
            height: <span class="poke-height">${data.height}</span>
          </p>
        </div>
      </div>`
    })
    .catch((err) => console.error(err))

}