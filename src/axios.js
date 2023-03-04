import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;

const GOOGLE_API_KEY = "AIzaSyCkgeeevJVjbh-NZCFPB2GoRKFgQxjKY6w";
export const youtubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 1,
    key: GOOGLE_API_KEY,
  },
  headers: {},
});
