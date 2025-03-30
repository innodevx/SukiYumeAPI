const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String },
  appearance: {
    hairColor: String,
    eyeColor: String,
    skinTone: String,
  },
  personality: String,
  archetype: String,
  anime: [String],
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
