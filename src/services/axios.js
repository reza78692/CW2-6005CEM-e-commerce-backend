import axios from 'axios';

const API = axios.create({
  baseURL: "http://127.0.0.1:8000" // Adjust this URL to match your Django server address and port
});

export default API;
