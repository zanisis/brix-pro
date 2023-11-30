import { defineStore } from 'pinia';

type State = {
  movies: Movie[];
};

export const useMovieStore = defineStore('movieCollection', {
  state: (): State => ({
    movies: [],
  }),
  actions: {
    addMovie(data: Movie) {
      const newMovie: Movie[] = [...this.movies];
      newMovie.push(data);
      this.movies = newMovie;
    },
  },
  persist: true,
});
