import axios from "axios";

// const ipAddress = location.hostname;

axios.defaults.baseURL = `https://api.donut-ll40.me`;
axios.defaults.withCredentials = true

export default axios;