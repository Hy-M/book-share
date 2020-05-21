import axios from "axios";
const baseURL =
  "https://9s48615mc2.execute-api.us-east-2.amazonaws.com/production/";
import * as apiKey from "./apiConfig";

export const getUser = (username) => {
  return axios.get(`${baseURL}user/${username}`).then(({ data }) => {
    console.log(data);
  });
};

export const updateUserDetails = (username, newAddress) => {
  return axios
    .patch(`${baseURL}user/${username}`, { Address: newAddress })
    .then(({ data }) => {
      console.log(data);
    });
};

export const deleteUser = (username) => {
  return axios.delete(`${baseURL}user/${username}`).then(({ data }) => {
    console.log(data);
  });
};

export const getPurchasedBooks = (username) => {
  return axios.get(`${baseURL}books/${username}/purchased`).then(({ data }) => {
    console.log(data);
  });
};

export const updatePurchasedBooks = (username, purchasedBookArr) => {
  //needs to be in an array even if a single book
  return axios
    .post(`${baseURL}books/${username}/purchased`, {
      Purchased: purchasedBookArr,
    })
    .then(({ data }) => {
      console.log(data);
    });
};

export const deleteFromPurchased = (username, purchasedBook) => {
  return axios
    .delete(`${baseURL}books/${username}/purchased`, {
      Purchased: purchasedBook,
    })
    .then(({ data }) => {
      console.log(data);
    });
};

export const getSellingBooks = (username) => {
  return axios.get(`${baseURL}books/${username}/selling`).then(({ data }) => {
    console.log(data);
  });
};

export const updateSellingBooks = (username, sellingBookArr) => {
  //needs to be in an array even if a single book
  return axios
    .post(`${baseURL}books/${username}/selling`, { Selling: sellingBookArr })
    .then(({ data }) => {
      console.log(data);
    });
};

export const deleteFromSelling = (username, sellingBook) => {
  return axios
    .delete(`${baseURL}books/${username}/selling`, { Selling: sellingBook })
    .then(({ data }) => {
      console.log(data);
    });
};

export const getAllSellingBooks = () => {
  return axios.get(`${baseURL}books/`).then(({ data }) => {
    console.log(data);
  });
};

// Database tree schema
/*{
   "User": {
    "S": "Anisa"
  },
  "Address": {
    "S": "67 Ashfield"
  },
  "Purchased": {
    "SS": [
      "Midnight Garden",
      "Pride and Prejudice",
      "Rosebud Garden"
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
