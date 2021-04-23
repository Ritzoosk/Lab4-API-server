'use strict';

const express = require('express');
const app = express();
const foodSchema = require('./models/food-schema');
const GenericCollection = require('./models/generic-collections.js');
const food = new GenericCollection(foodSchema);
const clothesRoutes = require('./routes/clothes');
const cors = require('cors');




const notFound = require('./error-handlers/404.js');
const errors = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const foodRoutes = require('./routes/food.js');

app.use(cors());
app.use(logger);
app.use(express.json());

app.use(foodRoutes);

app.use(clothesRoutes)


app.use('*', notFound);

app.use(errors);



module.exports = {
  server: app,
  start: port => {
    app.listen(port, () =>{
      console.log('App is up');
    })
  }
}


// dummy data
const databaseInteractions = async () => {

  let pizza = {
    name: 'pizza',
    calories: 1200,
    type: 'VEG'
  }

  let apple = {
    name: 'apple',
    calories: 30,
    type: 'FRUIT'
  }

  let newFood = await food.create(pizza);
  let moreFood = await food.create(apple);

  console.log('create:', newFood);

  let oneFood = await food.read(newFood._id);
  console.log('get one food item', oneFood);

  let allFoods = await food.read();
  console.log(allFoods);
}

databaseInteractions();
