'use strict';

// const foodSchema = require('./food-schema.js'); //?? DO I NEED THIS??

class GenericCollection {

  constructor(schema){
    console.log('schema', schema);
    this.model = schema;
  }

  create(record) {
    let newRecord = new this.model(record);
    return newRecord.save();
  }

  read(_id) {
    if (_id) {
      return this.model.findById(_id);
    } else {
      return this.model.find({});
    }
  }

  update(_id, record){
    return this.model.findById(_id, record, {new: true});

  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }
};

module.exports = GenericCollection;