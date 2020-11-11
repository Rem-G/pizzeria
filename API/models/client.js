var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  nom: String,
  mdp: String,
  email: String,
  adresse: String,
  pizzas : [{
    type: Schema.ObjectId,
    ref: 'Pizza',
  }],
});

module.exports = mongoose.model('Client', ClientSchema);
