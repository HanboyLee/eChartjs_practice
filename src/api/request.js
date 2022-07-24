import axios from "axios";
import apiBase from "../configs/apiBase";

const instance = axios.create({
    baseURL: apiBase.BASEURL,
    timeout: 5000,
});

export const request = (url) => {
    return instance.get(url);
};
