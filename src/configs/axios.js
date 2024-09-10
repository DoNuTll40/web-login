import axios from "axios";

// const ipAddress = location.hostname;

axios.defaults.baseURL = `https://elysia-api-mongodb.onrender.com`;
axios.defaults.withCredentials = true

export default axios;