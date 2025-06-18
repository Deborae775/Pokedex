const pokemonName = document.querySelector('.pokedex_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.botao-prev');
const buttonNext = document.querySelector('.botao-next');
const pokemonType = document.querySelector('.pokemon_type');

let searchPokemon = 1;

// Buscar dados da API
const fetchPokemon = async (pokemon) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) throw new Error('Não encontrado');
    return await response.json();
  } catch (err) {
    return null;
  }
};

// Exibir Pokémon na tela
const renderPokemon = async (pokemon) => {
  if (!pokemon) {
    pokemonName.innerHTML = 'DIGITE:';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
    pokemonType.innerHTML = '';
    return;
  }

  pokemonName.innerHTML = 'Procurando...';
  pokemonNumber.innerHTML = '';
  pokemonImage.style.display = 'none';
  pokemonType.innerHTML = '';

  const data = await fetchPokemon(pokemon);
    
    if (data) {
    pokemonImage.style.display = 'block';
    pokemonImage.src = data.sprites.front_default || '';
    pokemonImage.alt = data.name;
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `${data.id}`;
    searchPokemon = data.id;
    input.value = '';

 const types = data.types.map(type => type.type.name);
    pokemonType.innerHTML = types.join(' / ').toUpperCase();
  } else {
    pokemonName.innerHTML = 'Não encontrado ❌';
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
  }
};

// Enviar formulário (buscar pelo nome ou número)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim().toLowerCase();
  renderPokemon(value);
});

// Botão anterior
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

// Botão próximo
buttonNext.addEventListener('click', () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

// Primeira renderização (mensagem inicial)
renderPokemon('');
