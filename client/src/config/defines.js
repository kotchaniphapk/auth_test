const isDev = import.meta.env.DEV;

export const API_URL = isDev ? "http://localhost:3001" : "https://api.sodality.com";
