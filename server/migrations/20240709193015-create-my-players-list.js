"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MyPlayersLists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      nomor: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      id_rapidAPI: {
        type: Sequelize.INTEGER,
      },
      id_myDreamTeam: {
        type: Sequelize.INTEGER,
        references: {
          model: "MyDreamClubs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MyPlayersLists");
  },
};
