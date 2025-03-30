const Character = require('../models/Character');

const createCharacter = async (req, res) => {
  try {
    const newCharacter = new Character(req.body);
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCharacter, getCharacters };
