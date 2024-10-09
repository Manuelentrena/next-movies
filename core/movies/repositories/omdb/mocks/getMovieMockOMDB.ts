import { MovieDetail } from "@/core/movies/domain/Movie";
import { SearchById } from "@/core/movies/domain/Search";
import { adapterMovieDetailOMDB } from "../adapters/omdb.adapter";

export const getMovieMockOMDB = async ({ id }: SearchById): Promise<MovieDetail> => {
  if (id === "tt0372784") {
    const MovieDetail = {
      Title: "Batman Begins",
      Year: "2005",
      Rated: "PG-13",
      Released: "15 Jun 2005",
      Runtime: "140 min",
      Genre: "Action, Crime, Drama",
      Director: "Christopher Nolan",
      Writer: "Bob Kane, David S. Goyer, Christopher Nolan",
      Actors: "Christian Bale, Michael Caine, Ken Watanabe",
      Plot: "After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.",
      Language: "English, Mandarin",
      Country: "United States, United Kingdom",
      Awards: "Nominated for 1 Oscar. 15 wins & 79 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.2/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "85%",
        },
        {
          Source: "Metacritic",
          Value: "70/100",
        },
      ],
      Metascore: "70",
      imdbRating: "8.2",
      imdbVotes: "1,601,743",
      imdbID: "tt0372784",
      Type: "movie",
      DVD: "N/A",
      BoxOffice: "$206,863,479",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    };
    return adapterMovieDetailOMDB(MovieDetail);
  }
  if (id === "tt1877830") {
    const MovieDetail = {
      Title: "The Batman",
      Year: "2022",
      Rated: "PG-13",
      Released: "04 Mar 2022",
      Runtime: "176 min",
      Genre: "Action, Crime, Drama",
      Director: "Matt Reeves",
      Writer: "Matt Reeves, Peter Craig, Bob Kane",
      Actors: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
      Plot: "When a sadistic serial killer begins murdering key political figures in Gotham, The Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
      Language: "English, Spanish, Latin, Italian",
      Country: "United States",
      Awards: "Nominated for 3 Oscars. 38 wins & 184 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "7.8/10",
        },
        {
          Source: "Rotten Tomatoes",
          Value: "85%",
        },
        {
          Source: "Metacritic",
          Value: "72/100",
        },
      ],
      Metascore: "72",
      imdbRating: "7.8",
      imdbVotes: "815,820",
      imdbID: "tt1877830",
      Type: "movie",
      DVD: "N/A",
      BoxOffice: "$369,345,583",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    };
    return adapterMovieDetailOMDB(MovieDetail);
  }
  if (id === "tt0103359") {
    const MovieDetail = {
      Title: "Batman: The Animated Series",
      Year: "1992–1995",
      Rated: "TV-PG",
      Released: "05 Sep 1992",
      Runtime: "23 min",
      Genre: "Animation, Action, Adventure",
      Director: "N/A",
      Writer: "Bob Kane, Eric Radomski, Bruce Timm",
      Actors: "Kevin Conroy, Loren Lester, Efrem Zimbalist Jr.",
      Plot: "The Dark Knight battles crime in Gotham City.",
      Language: "English",
      Country: "United States",
      Awards: "Won 1 Primetime Emmy. 5 wins & 19 nominations total",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmVkNDc3YjQtZDMzOS00MTNjLTljNzUtZDhjYWQxMmVlNjE5XkEyXkFqcGdeQXVyNTgyNTA4MjM@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "9.0/10",
        },
      ],
      Metascore: "N/A",
      imdbRating: "9.0",
      imdbVotes: "120,387",
      imdbID: "tt0103359",
      Type: "series",
      DVD: "N/A",
      BoxOffice: "$369,345,583",
      Production: "N/A",
      Website: "N/A",
      Response: "True",
    };
    return adapterMovieDetailOMDB(MovieDetail);
  }
  const movieDetailEmpty = {
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    Ratings: [
      {
        Source: "",
        Value: "",
      },
      {
        Source: "",
        Value: "",
      },
      {
        Source: "",
        Value: "",
      },
    ],
    Metascore: "",
    imdbRating: "",
    imdbVotes: "",
    imdbID: "",
    Type: "",
    DVD: "",
    BoxOffice: "",
    Production: "",
    Website: "",
    Response: "",
  };
  return adapterMovieDetailOMDB(movieDetailEmpty);
};
