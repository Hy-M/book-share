import axios from "axios";
const baseURL =
  "https://9s48615mc2.execute-api.us-east-2.amazonaws.com/production/";
import * as apiKey from "./apiConfig";

export const getUser = (username) => {
  return axios
    .get(`${baseURL}user/${username}`, {
      headers: { "x-api-key": apiKey },
    })
    .then(({ data }) => {
      console.log(data);
    });
};

// Authorization: jwtToken
