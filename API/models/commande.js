var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommandeSchema = new Schema({
  pizzas : [{
      type: Schema.ObjectId,
      ref: 'Pizza',
  }],
  client : [{
    type: Schema.ObjectId,
    ref: 'Client',
  }],
});

module.exports = mongoose.model('Commande', CommandeSchema);
