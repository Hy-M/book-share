import axios from "axios";
const baseURL =
  "https://9s48615mc2.execute-api.us-east-2.amazonaws.com/production/";

export const getUser = (username) => {
  return axios
    .get(`${baseURL}user/${username}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const updateUserDetails = (username, newAddress) => {
  return axios
    .patch(`${baseURL}user/${username}`, { Address: newAddress })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const deleteUser = (username) => {
  return axios
    .delete(`${baseURL}user/${username}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const getPurchasedBooks = (username) => {
  return axios
    .get(`${baseURL}books/${username}/purchased`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const updatePurchasedBooks = (username, purchasedBookArr) => {
  //needs to be in an array even if a single book
  return axios
    .post(`${baseURL}books/${username}/purchased`, {
      Purchased: purchasedBookArr,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const deleteFromPurchased = (username, purchasedBook) => {
  return axios
    .delete(`${baseURL}books/${username}/purchased`, {
      Purchased: purchasedBook,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const getSellingBooks = (username) => {
  return axios
    .get(`${baseURL}books/${username}/selling`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const updateSellingBooks = (username, sellingBookArr) => {
  //needs to be in an array even if a single book
  return axios
    .post(`${baseURL}books/${username}/selling`, { Selling: sellingBookArr })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const deleteFromSelling = (username, sellingBook) => {
  return axios
    .delete(`${baseURL}books/${username}/selling`, { Selling: sellingBook })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

export const getAllSellingBooks = () => {
  return axios
    .get(`${baseURL}books/`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err));
};

exports.getBooksByInput = (input) => {
  console.log(input);
};

exports.getBookByTitle = (input) => {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${input}&maxResults=1`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err, "< err in api.js"));
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
    .catch((err) => console.log(err, "< err in getBookToUpload"));
};

exports.validatePostcode = (postcode) => {
  return axios
    .get(`https://api.postcodes.io/postcodes/${postcode}/validate`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.log(err, "< err in validatePostcode"));
};

exports.getDistance = (postcode) => {
  return axios.get(`${postcode}`).then(({ data }) => {
    console.log(data, "< data");
    return data;
  });
};

// Database tree schema
/* {
   "User": {
    "S": "7460fe41-caf7-4437-9faf-06ce5dfb3c5e"
  },
  "Address": {
    "S": "67 Ashfield"
  },
  "Purchased": {
    "SS": [
      "Midnight Garden",
      "New Moon",
      "Pride and Prejudice",
      "Rosebud Garden",
      "Twilight"
    ]
  },
  "Selling": {
    "SS": [
      "BlackHeart",
      "Eclipse",
      "Rosebud Garden",
      "The Borrowers",
      "The Hungry Caterpillar "
    ]
  }
} */
