const {model, Schema} = require('mongoose');

const itemSchema = new Schema({
  itemName: {type: String, required: true},
  description: {type: String, required: true}
})

module.exports = model('Item', itemSchema)
