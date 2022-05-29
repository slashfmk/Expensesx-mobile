import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:9000/api/v1",
    headers: {'Content-Type': 'application/json'},
});

export const axiosPrivate =  axios.create({
    baseURL: "http://localhost:9000/api/v1",
    headers: {'Content-Type': 'application/json'},
   withCredentials: true
});
