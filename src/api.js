const axios = require("axios");

exports.getBooksByInput = input => {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&maxResults=4`
    )
    .then(({ data }) => {
      console.log(data);
    });
};
