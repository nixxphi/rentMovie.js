const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
const movieData = [];

function addMovie(id, title, releaseDate, director, cast, genre, rating, sourceURL, rentalPrice, status) {
  movieData.push({
    id,
    title,
    releaseDate,
    director,
    cast,
    genre,
    rating,
    sourceURL,
    rentalPrice,
    status,
  });
}
addMovie(1, "Dune: Part Two", "2024-11-17", "Denis Villeneuve", ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"], "Sci-Fi", 85, "https://www.imdb.com/title/tt11803570/", 4.99, true);
addMovie(2, "Mortal Kombat", "When was that again?", "should I know?", ["Sub-zero, I think?", "New armour guy"], "Sci-Fi", 80, "I ain't doing that",  3.29, true);
addMovie(3, "Tenet", "In the future past", "Not a clue", ["Serious Black Dude", "Icy explosions"], "Sci-fi", 90, "haven't you seen it already?😅", 1.99, true);

addMovie(4, "The Guardians of The Galaxy", "04-06-2024, I asked Groot", "He is good but I don't really care rn", ["I am Groot", "QuilldDrunk", "Usb port ears", "Smartest rat in the galaxy", "Skin-mask.purple", "... Something's wrong with golden boy"], "Sci-Fi/Magic", 99, "itsIKnowYouAlreadySawIt.com", 3.69, true);
addMovie(5, "The Shawshank Redemption", "I really don't watch that many movies", "So why would I know directors?", [ "Two imprisoned men", "A weird box", "What promise of escape?"], "Drama", 79,  "https://lol.com/shawshank", 2.99, true)

function rankMovie(movie) {
  const weights = {
    imdb: 0.4,
    metacritic: 0.3,
    rottenTomatoes: 0.2,
    boxOfficePro: 0.1,
  };

  let score = 0;
  for (const source in weights) {
    if (movie[source]) {
      score += movie[source] * weights[source];
    }
  }

  return score;
}

function sortAndDisplayTop5() {
  movieData.sort((a, b) => rankMovie(b) - rankMovie(a));
  const top5 = movieData.slice(0, 5);
  console.log(top5);
}

function checkMStatus(movie) {
  console.log(`The movie, ${movie.title} is available for rent.`);
  return movie.status = false;
}

function getMovie(id) {
  return movieData.find(movie => movie.id === id);
}
const cart = [];
function rentMovie(movieId) {
  const movie = movieData.find(movie => movie.id === movieId);

  if (movie.status) {
    cart.push(movie);
    movie.status = false;
    console.log(`Successfully rented "${movie.title}"!`);
  } else {
    console.log(`We're sorry, "${movie.title}" is currently unavailable.`);
  }
}

function returnMovie(movieId) {
  const movie = movieData.find(movie => movie.id === movieId);

  if (!movie.status) {
    movie.status = true;
    console.log(`Returned "${movie.title}"!`);
  } else {
    console.warn(`"${movie.title}" is already available.`);
  }
}

function displayMovies(movies) {
  movies.forEach(movie => console.log(movie));
}
function handleRent() {
    readline.question('Enter the ID number of the movie you want to rent: ', (movieId) => {
      const movieIdNumber = parseInt(movieId); 
      rentMovie(movieIdNumber); 
    });
  }
  
  function handleReturn() {
    readline.question('Enter the ID of the movie you want to return: ', (movieId) => {
      const movieIdNumber = parseInt(movieId);
      returnMovie(movieIdNumber); 
    });
  }
  function addToCart(movieId) {
    const movie = movieData.find(movie => movie.id === movieId);
  
    if (movie.status) {
      if (cart.find(item => item.id === movieId)) {
        console.log(`${movie.title} is already in your cart.`);
      } else {
        cart.push(movie);
        console.log(`${movie.title} added to cart!`);
      }
    } else {
      console.log(`We're sorry, "${movie.title}" is currently unavailable.`);
    }
  }
function handleAddToCart() {
    readline.question('Enter the ID of the movie you want to add to cart: ', (movieId) => {
      const movieIdNumber = parseInt(movieId);
      addToCart(movieIdNumber);
    });
  }
function handleUserInput() {
    readline.question(`Enter a command (rent, return, addToCart, viewCart, checkout, quit): `, (command) => {
      switch (command.toLowerCase()) {
        case 'rent':
          handleRent();
          break;
        case 'return':
          handleReturn();
          break;
        case 'addtocart':
          handleAddToCart();
          break;
        case 'viewcart':
          function displayCart(){
            return cart;
          };
          displayCart();
          break;
        case 'checkout':
          handleCheckout();
          break;
        case 'quit':
          process.exit();
        default:
          console.log('Invalid command. Please try again.');
      }
      handleUserInput();
    });
  }
  
  
  


sortAndDisplayTop5();
displayMovies(movieData);
handleUserInput();

