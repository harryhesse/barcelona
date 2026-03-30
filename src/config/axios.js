import axios from "axios";
import dotenv from "dotenv";

// Ensure env variables are loaded here
dotenv.config();

// Axios instance for Football-Data
export const footballDataAPI = axios.create({
  baseURL: "https://api.football-data.org/v4",
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_DATA_X_AUTH_TOKEN,
    "Content-Type": "application/json",
  },
});

// Axios instance for SportDB
export const transfermarktAPI = axios.create({
  baseURL: "https://api.sportdb.dev/api/transfermarkt",
  headers: {
    "X-API-Key": process.env.SPORTDB_X_API_KEY,
    "Content-Type": "application/json",
  },
});

// 429 retry interceptor
transfermarktAPI.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"] || 1;
      console.warn(`Rate limited. Retrying after ${retryAfter}s...`);
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      return transfermarktAPI.request(error.config);
    }
    return Promise.reject(error);
  },
);

export const flashcoreAPI = axios.create({
  baseURL: "https://api.sportdb.dev/api/flashscore",
  headers: {
    "X-API-Key": process.env.SPORTDB_X_API_KEY,
    "Content-Type": "application/json",
  },
});

export const pepsiAPI = axios.create({
  baseURL: "https://api-fcb.pulselive.com/football",
  headers: {
    "X-API-Key": process.env.SPORTDB_X_API_KEY,
    "Content-Type": "application/json",
  },
});

export const legoAPI = axios.create({
  baseURL: "https://api.sportdb.dev/api/flashscore",
  headers: {
    "X-API-Key": process.env.SPORTDB_X_API_KEY,
    "Content-Type": "application/json",
  },
});
