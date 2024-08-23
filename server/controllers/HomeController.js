const transfermarktAPI = require("../helpers/transfermarkt");
const key = process.env.RAPIDAPI_KEY;

class HomeController {
  static async getAllNews(req, res, next) {
    try {
      let { page } = req.query;
      if (!Number(page)) {
        page = 0;
      } else {
        page = Number(page);
      }
      const response = await transfermarktAPI({
        method: "GET",
        url: "/news/explorer",
        params: {
          club_ids: "16,3",
          locale: "IN",
          page_number: `${page}`,
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }
  static async getAllSchedule(req, res, next) {
    try {
      const response = await transfermarktAPI({
        method: "GET",
        url: "/competitions/play-day-matches",
        params: {
          locale: "IN",
          competition_id: "GB1",
          match_day: "29",
          season_id: "2023",
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HomeController;
