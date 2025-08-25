// Seleciona os elementos do HTML
const pokedexContainer = document.getElementById('pokedex-container');
const searchInput = document.getElementById('search-input');

// Define um mapa de cores para cada tipo de Pokémon
const typeColors = {
    fire: '#FF6C6C',
    grass: '#78C850',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    dark: '#705848',
    flying: '#A890F0'
};

let pokemonData = []; // Array para armazenar os dados dos Pokémon

// Função para buscar os dados dos Pokémon na API
const fetchPokemons = async () => {
    try {
        // Busca os primeiros 151 Pokémon
        for (let i = 1; i <= 151; i++) {
            await getPokemon(i);
        }
        displayPokemons(pokemonData);
    } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
    }
};

// Função para buscar os dados de um Pokémon específico por ID
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const pokemon = await response.json();
    pokemonData.push(pokemon);
};

// Função para exibir os Pokémon na página
const displayPokemons = (pokemons) => {
    pokedexContainer.innerHTML = ''; // Limpa o container
    pokemons.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        // Pega o tipo principal e define a cor de fundo
        const primaryType = pokemon.types[0].type.name;
        const color = typeColors[primaryType] || '#A8A878'; // Cor padrão se não encontrar
        pokemonCard.style.backgroundColor = color;

        // Formata o ID para ter 3 dígitos (ex: #001)
        const pokemonId = pokemon.id.toString().padStart(3, '0');
        const pokemonName = pokemon.name;
        const pokemonImage = pokemon.sprites.front_default;

        pokemonCard.innerHTML = `
            <span class="pokemon-id">#${pokemonId}</span>
            <img src="${pokemonImage}" alt="${pokemonName}">
            <h2 class="pokemon-name">${pokemonName}</h2>
            <p class="pokemon-type">Type: ${primaryType}</p>
        `;

        pokedexContainer.appendChild(pokemonCard);
    });
};

// Adiciona o listener para o campo de busca
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPokemons = pokemonData.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm)
    );
    displayPokemons(filteredPokemons);
});

// Inicia o processo ao carregar a página
fetchPokemons();