import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "8f84640eaec345addf5f99ad785ed454",
    language: "en-US"
  }
});
// https://api.themoviedb.org/3/movie/popular?api_key=8f84640eaec345addf5f99ad785ed454&language=en-US&page=1
export const tvApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get
};

export const movieApi = {};
