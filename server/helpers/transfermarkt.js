const axios = require("axios");

const transfermarktAPI = axios.create({
  baseURL: "https://transfermarkt-db.p.rapidapi.com/v1",
  timeout: 5000,
});

module.exports = transfermarktAPI;
