//top of the page elements
const inputElement = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

//card of the pokemon
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const type = document.getElementById('types');

//table elements
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

//sprite container
const spriteContainer = document.getElementById('sprite-container');

const getPokemon = async () => {
    try {
        const pokemonNameOrNumber = inputElement.value.toLowerCase();
        const response = await fetch(
          `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrNumber}`
        );

        const data = await response.json();

        //set the card info
        pokemonName.textContent = `${data.name}`.toUpperCase();
        pokemonId.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;

        //image info/ sprite
        spriteContainer.innerHTML = (`<img id="sprite" src="${data.sprites.front_default}" alt="front default for ${data.name.toUpperCase()}">`)

        //type info
        type.innerHTML = data.types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
        .join('');

        //set the stats info
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        spAttack.textContent = data.stats[3].base_stat;
        spDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;
    } catch(err) {
      resetDisplay();
      alert('Pokemon not found');
      console.log(`Pokemon not found: ${err}`);
    }
}

const resetDisplay = () => {

  while(spriteContainer.firstChild) {
    spriteContainer.removeChild(spriteContainer.firstChild);
  }

  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  spAttack.textContent = '';
  spDefense.textContent = '';
  speed.textContent = '';
  pokemonName.textContent = '';
  pokemonId.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  type.innerHTML = '';
}

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  getPokemon();
});
