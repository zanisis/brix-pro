import { defineStore } from 'pinia';

type State = {
  movies: Movie[];
};

export const useMovieStore = defineStore('movieCollection', {
  state: (): State => ({
    movies: [],
  }),
  actions: {
    addMovie(data: Omit<Movie, 'id'>) {
      const newData = {
        id: this.movies.length + 1,
        ...data,
      };
      this.movies = [...this.movies, newData];
    },
    updateMovie(data: Movie) {
      const newData = [...this.movies];
      for (let i = 0; i < newData.length; ) {
        if (newData[i].id === data.id) {
          newData.splice(i, 1, data);
          break;
        } else {
          i++;
        }
      }
      this.movies = newData;
    },
    deleteMovie(title: string) {
      const newData = [...this.movies];
      for (let i = 0; i < newData.length; ) {
        if (newData[i].title === title) {
          newData.splice(i, 1);
          break;
        } else {
          i++;
        }
      }
      this.movies = newData;
    },
  },
  persist: true,
});
