'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    directorPersonId: {
      type: Sequelize.INTEGER,
      foreignKey: {},
    }
  }, { sequelize });

  Movie.associate = (models) => {
    Movie.belongsTo(models.Person, {    //tells sequelize movie can be asociated w/only one person
      as: 'director',
      foreignKey: {
        fieldName: 'directorPersonId',
        allowNull: false,
      },
    } ) // TODO Add associations. one-to-one associate
  
  };

  return Movie;
};
