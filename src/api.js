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

exports.getBookToUpload = (title, author) => {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&maxResults=1`
    )
    .then(({ data }) => {
      if (data.totalItems) {
        return data;
      } else {
        return Promise.reject("Book not found");
      }
    })
    .catch(err => console.log(err, "< err in getBookToUpload"));
};

exports.validatePostcode = postcode => {
  return axios
    .get(`https://api.postcodes.io/postcodes/${postcode}/validate`)
    .then(({ data }) => {
      return data;
    })
    .catch(err => console.log(err, "< err in validatePostcode"));
};
