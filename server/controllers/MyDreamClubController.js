const { MyDreamClub, MyPlayersList } = require("../models/index");
const transfermarktAPI = require("../helpers/transfermarkt");
const key = process.env.RAPIDAPI_KEY;
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

class MyDreamClubControllers {
  static async CreateMyDreamClub(req, res, next) {
    try {
      let dream_club_name = req.body.name;
      let logo = req.body.logo;
      let stadium = req.body.stadium;
      let user_id = req.user.id;

      if (!dream_club_name || !logo || !stadium) {
        throw { name: "DataMyDreamClubNotComplete" };
      }

      let saved = await MyDreamClub.create({
        dream_club_name,
        logo,
        stadium,
        user_id,
      });

      let position = [
        "GK",
        "LB",
        "CBL",
        "CBR",
        "RB",
        "LMF",
        "CMF",
        "RMF",
        "LW",
        "RW",
        "ST",
      ];
      for (let i = 0; i < position.length; i++) {
        const post = position[i];
        let player = await MyPlayersList.create({
          nama: null,
          nomor: null,
          photo: null,
          position: post,
          id_rapidAPI: null,
          id_myDreamTeam: saved.id,
        });
      }
      res.status(201).json({
        message: `Success create my dream club ${dream_club_name}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyDreamClub(req, res, next) {
    const data = await MyDreamClub.findOne({
      where: {
        user_id: req.user.id,
      },
      include: [
        {
          model: MyPlayersList,
          order: [["createdAt", "ASCS"]],
        },
      ],
    });

    if (!data) {
      res.status(200).json({ data: null });
    } else {
      res.status(200).json({ data });
    }
  }

  static async deleteMyDreamclub(req, res, next) {
    try {
      const data = await MyDreamClub.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        throw { name: "MyDreamClubNotFound" };
      }
      if (data.user_id !== req.user.id) {
        throw { name: "unauthorized" };
      }
      await MyDreamClub.destroy({
        where: {
          id: data.id,
        },
      });
      res.status(200).json({
        message: `Success delete ${data.dream_club_name}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async generateLogo(req, res, next) {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_KEY,
      });

      const { prompt } = req.body;

      if (!prompt) {
        throw { name: "Promptisrequired" };
      }

      const response = await await openai.images.generate({
        model: "dall-e-3",
        prompt: `generate logo football club with ${prompt}`,
        n: 1,
        size: "1024x1024",
      });
      const imageUrl = response.data[0].url;

      res.status(200).json({ imageUrl });
    } catch (error) {
      next(error);
    }
  }

  static async searchPlayerRapidapi(req, res, next) {
    try {
      const response = await transfermarktAPI({
        method: "GET",
        url: "https://transfermarkt-db.p.rapidapi.com/v1/search/full-search",
        params: {
          query: req.query.search,
          page_number: "0",
          search_type: "players",
          locale: "IN",
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      });

      res.status(200).json(response.data?.data?.players);
    } catch (error) {
      next(error);
    }
  }

  static async setPlayer(req, res, next) {
    try {
      let id_player = req.body.idPlayer;
      let id_rapidapi = req.body.idRapidapi;
      let data = await MyPlayersList.findOne({
        where: {
          id: id_player,
        },
      });
      if (!data) {
        throw { name: "PlayerNotFound" };
      }

      let player = await transfermarktAPI({
        method: "GET",
        url: "https://transfermarkt-db.p.rapidapi.com/v1/players/info",
        params: {
          locale: "IN",
          player_id: `${id_rapidapi}`,
        },
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
        },
      });
      if (!player) {
        throw { name: "PlayerNotFound" };
      }

      await MyPlayersList.update(
        {
          nama: player.data.data.details.player.name,
          nomor: player.data.data.details.player.shirtNumber,
          photo: player.data.data.details.player.image,
          id_rapidAPI: id_rapidapi,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      res.status(201).json({
        message: `Success set player ${player.data.data.details.player.name} as ${data.position}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MyDreamClubControllers;
