const { MyClub } = require("../models/index");
const transfermarktAPI = require("../helpers/transfermarkt");
const key = process.env.RAPIDAPI_KEY;

class MyClubControllers {
  static async MyClub(req, res, next) {
    const { id } = req.user;
    const data = await MyClub.findOne({
      where: {
        user_id: id,
      },
    });
    if (!data) {
      res.status(200).json({ data: [] });
      return;
    }

    const details = await transfermarktAPI({
      method: "GET",
      url: "https://transfermarkt-db.p.rapidapi.com/v1/clubs/profile",
      params: {
        club_id: `${data.id_rapidAPI}`,
        locale: "IN",
      },
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
      },
    });

    const news = await transfermarktAPI({
      method: "GET",
      url: "https://transfermarkt-db.p.rapidapi.com/v1/clubs/news",
      params: {
        club_id: `${data.id_rapidAPI}`,
        locale: "IN",
      },
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
      },
    });

    res.status(200).json({
      ...details.data.data,
      news: news.data.data,
      myclub: data,
    });
  }

  static async searchClubRapidapi(req, res, next) {
    try {
      const response = await transfermarktAPI({
        method: "GET",
        url: "https://transfermarkt-db.p.rapidapi.com/v1/search/full-search",
        params: {
          query: req.query.search,
          page_number: "0",
          search_type: "clubs",
          locale: "IN",
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      });

      res.status(200).json(response.data?.data?.clubs);
    } catch (error) {
      next(error);
    }
  }

  static async createMyclub(req, res, next) {
    try {
      let id_rapidAPI = req.body.id;
      let user_id = req.user.id;
      let club = await transfermarktAPI({
        method: "GET",
        url: "https://transfermarkt-db.p.rapidapi.com/v1/clubs/info",
        params: {
          club_id: `${id_rapidAPI}`,
          locale: "IN",
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      });

      if (!id_rapidAPI) {
        throw { name: "dataClubNotcomplete" };
      }
      const saved = await MyClub.create({
        club_name: club.data?.data?.name,
        club_logo: club.data?.data?.image,
        id_rapidAPI,
        user_id,
      });
      res.status(201).json(saved);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMyclub(req, res, next) {
    try {
      const data = await MyClub.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        throw { name: "MyclubNotFound" };
      }
      if (data.user_id !== req.user.id) {
        throw { name: "unauthorized" };
      }
      await MyClub.destroy({
        where: {
          id: data.id,
        },
      });
      res.status(200).json({
        message: `Success delete ${data.club_name}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyClubControllers;
