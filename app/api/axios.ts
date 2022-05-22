import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.1.9:9000/api/v1"
});

export const axiosPrivate =  axios.create({
    baseURL: "http://192.168.1.9:9000/api/v1",
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});
