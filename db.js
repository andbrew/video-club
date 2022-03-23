const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieModel = require('./models/movie');
const movieActorModel = require('./models/movieActor');

const sequelize = new Sequelize('video_club', 'balux', '6913', {
  host: '127.0.0.1',
  dialect: 'mariadb'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);

Director.hasMany(Movie, {
  as: 'movies'
});
Movie.belongsTo(Director, {
  as: 'director'
});

Genre.hasMany(Movie, {
  as: 'movies'
});
Movie.belongsTo(Genre, {
  as: 'genre'
});

Movie.belongsToMany(Actor, {
  through: 'movieActors',
  foreignKey: 'actorId',
  as: 'actors'
});
Actor.belongsToMany(Movie, {
  through: 'movieActors',
  foreignKey: 'movieId',
  as: 'movies'
});

sequelize.sync({force: true}).then(() => {
  console.log('DB updated');
});

module.exports = {Director, Genre, Actor, Member, Movie};
