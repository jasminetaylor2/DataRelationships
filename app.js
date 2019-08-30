'use strict';

const { sequelize, models } = require('./db');

// Get references to our models.
const { Person, Movie } = models;

// Define variables for the people and movies.
// NOTE: We'll use these variables to assist with the creation
// of our related data after we've defined the relationships
// (or associations) between our models.
let bradBird;
let vinDiesel;
let eliMarienthal;
let craigTNelson;
let hollyHunter;
let theIronGiant;
let theIncredibles;

console.log('Testing the connection to the database...');

(async () => {
  try {
    // Test the connection to the database
    console.log('Connection to the database successful!');
    await sequelize.authenticate();
    // Sync the models
    console.log('Synchronizing the models with the database...');
    await sequelize.sync({ force: true });
    // Add People to the Database
    console.log('Adding people to the database...');
    const peopleInstances = await Promise.all([  //returns resolvdeed promis with all person model instances
      Person.create({
        firstName: 'Brad',
        lastName: 'Bird',
      }),
      Person.create({
        firstName: 'Vin',
        lastName: 'Diesel',
      }),
      Person.create({
        firstName: 'Eli',
        lastName: 'Marienthal',
      }),
      Person.create({
        firstName: 'Craig T.',
        lastName: 'Nelson',
      }),
      Person.create({
        firstName: 'Holly',
        lastName: 'Hunter',
    
      })
    ]);
    console.log(JSON.stringify(peopleInstances,null, 2)); //data from Movie and People db are quired and write to console

    // Update the global variables for the people instances
    [bradBird, vinDiesel, eliMarienthal, craigTNelson, hollyHunter] = peopleInstances;
    // Add Movies to the Database
    console.log('Adding movies to the database...');
    const movieInstances = await Promise.all([ //The movieInstances variable holds the Movie model instances we just created.
    Movie.create({
      title: 'The Iron Giant',
      releaseYear: 1999,
      directorPersonId: bradBird.id,
    }),
      Movie.create({
        title: 'The Incredibles',
        releaseYear: 2004,
        directorPersonId: bradBird.id,
      }),
    ])
    console.log(JSON.stringify(movieInstances, null, 2));
    // Retrieve movies
    const movies = await Movie.findAll({
      include: [
        {
          model: 'Person',
        as: 'director',}
      ]
    });
    console.log(movies.map(movie => movie.get({ plain: true })));

    // Retrieve people
    const people = await Person.findAll();    //use SQLs findAll() to get people from databse and output to JSON as objects
    console.log(people.map(person => person.get({ plain: true })));  //return same as calling .toJSON
    process.exit();

  } catch(error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();

