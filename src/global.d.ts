declare global {
  type Movie = {
    id: number;
    title: string;
    director: string;
    summary: string;
    genres: string[];
  };

  type onSubmitMovie = Omit<Movie, 'genres'> | { selectedGenre: string[] };
}

export {};
