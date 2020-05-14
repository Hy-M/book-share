const axios = require("axios");

exports.getBooksByInput = input => {
  console.log(input);
};

exports.getBookByTitle = input => {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&maxResults=1`
    )
    .then(({ data }) => {
      return data;
    })
    .catch(err => console.log(err, "< err in api.js"));
};
