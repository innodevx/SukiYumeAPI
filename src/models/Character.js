const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },
  appearance: {
    hairColor: String,
    eyeColor: String,
    skinTone: String,
    hairStyle: String,
    clothing: String,
    bodyType: String,
    breastSize: {
      type: String,
      enum: ['Flat Chest', 'Small', 'Medium', 'Large', 'Extra Large'] 
    },
    buttSize: {
      type: String,
      enum: ['Small', 'Medium', 'Large', 'Extra Large']
    },
    accessories: [String],
},
  personality: {
    type: {
      type: [String]
    },
    archetype: String
  },
  anime: [String]
})

characterSchema.index({ name: 1, anime: 1 }, { unique: true })

const Character = mongoose.model('Character', characterSchema)

module.exports = Character
