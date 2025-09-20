import pool from "../config/db.js";
import logger from "../config/logger.js";

const movieList = [
  {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://fake.movie-posters.com/posters/inception_poster.jpg",
    genre: "Sci-Fi",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://fake.movie-posters.com/posters/shawshank_redemption.png",
    genre: "Drama",
  },
  {
    title: "Pulp Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://fake.movie-posters.com/posters/pulp_fiction_art.webp",
    genre: "Crime",
  },
  {
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://fake.movie-posters.com/posters/the_dark_knight_keyart.jpg",
    genre: "Action",
  },
  {
    title: "Forrest Gump",
    description:
      "A man with a low IQ recounts his life story, from being present for historical events to his one true love.",
    poster: "https://fake.movie-posters.com/posters/forrest_gump_poster.jpg",
    genre: "Drama",
  },
  {
    title: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster: "https://fake.movie-posters.com/posters/the_matrix_promo.jpg",
    genre: "Sci-Fi",
  },
  {
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://fake.movie-posters.com/posters/interstellar_art.jpg",
    genre: "Sci-Fi",
  },
  {
    title: "Gladiator",
    description:
      "A Roman general is betrayed and his family murdered by an emperor's corrupt son. He comes to Rome as a gladiator to seek revenge.",
    poster: "https://fake.movie-posters.com/posters/gladiator_dvd.jpg",
    genre: "Action",
  },
  {
    title: "Fight Club",
    description:
      "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker.",
    poster: "https://fake.movie-posters.com/posters/fight_club_poster.jpg",
    genre: "Drama",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "A young hobbit, Frodo, is bestowed with a magical ring and embarks on a quest to destroy it before a dark lord can use it to conquer the world.",
    poster: "https://fake.movie-posters.com/posters/fellowship_poster.jpg",
    genre: "Fantasy",
  },
  {
    title: "Jurassic Park",
    description:
      "A pragmatic paleontologist tours a park of cloned dinosaurs, as a power failure releases them to wreak havoc.",
    poster: "https://fake.movie-posters.com/posters/jurassic_park_promo.jpg",
    genre: "Adventure",
  },
  {
    title: "Parasite",
    description:
      "A poor family's plan to secretly infiltrate a wealthy family's home takes an unexpected turn when an unexpected guest arrives.",
    poster: "https://fake.movie-posters.com/posters/parasite_korean_art.jpg",
    genre: "Thriller",
  },
  {
    title: "Spirited Away",
    description:
      "During a family move, a 10-year-old girl gets lost and ends up in a spirit world where she must work to free her parents.",
    poster: "https://fake.movie-posters.com/posters/spirited_away_art.jpg",
    genre: "Animation",
  },
  {
    title: "The Silence of the Lambs",
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal to catch another serial killer.",
    poster: "https://fake.movie-posters.com/posters/silence_lambs_poster.jpg",
    genre: "Thriller",
  },
  {
    title: "Schindler's List",
    description:
      "In German-occupied Poland during WWII, Oskar Schindler becomes an unlikely humanitarian when he opens a factory to save Jews from extermination.",
    poster: "https://fake.movie-posters.com/posters/schindlers_list_poster.jpg",
    genre: "History",
  },
  {
    title: "Goodfellas",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.",
    poster: "https://fake.movie-posters.com/posters/goodfellas_promo.jpg",
    genre: "Crime",
  },
  {
    title: "Back to the Future",
    description:
      "A high school student is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his friend.",
    poster: "https://fake.movie-posters.com/posters/back_to_future_poster.jpg",
    genre: "Sci-Fi",
  },
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://fake.movie-posters.com/posters/the_godfather_promo.jpg",
    genre: "Crime",
  },
  {
    title: "Whiplash",
    description:
      "A promising young drummer enrolls at a cut-throat music academy where his a tyrannical instructor pushes him to his limits.",
    poster: "https://fake.movie-posters.com/posters/whiplash_art.jpg",
    genre: "Drama",
  },
  {
    title: "La La Land",
    description:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    poster: "https://fake.movie-posters.com/posters/la_la_land_poster.jpg",
    genre: "Musical",
  },
];

export const seedAllMovies = async () => {
  //REMOVE MOVIES
  await pool.query(`TRUNCATE TABLE movies RESTART IDENTITY CASCADE`);

  // ADD MOVIES
  let count: number = 0;
  for (const movie of movieList) {
    await pool.query(
      `INSERT INTO movies (title, description, poster, genre) VALUES ($1, $2, $3, $4)`,
      [movie.title, movie.description, movie.poster, movie.genre]
    );
    count = count + 1;
  }
  logger.info(`Seeding 100% Completed, ${count} : Movies added`);
};

await seedAllMovies();
