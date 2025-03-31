const Character = require('../models/Character');
const { getRandomCharacter } = require('../services/characterService');


const createCharacters = async (req, res) => {
    try {
      let characters = req.body;
  
      const charactersToInsert = characters.map(character => ({
        ...character,
        name: character.name.trim(),
        anime: character.anime.map(a => a.trim()),
      }));
  
      const charactersForCheck = characters.map(character => ({
        name: character.name.trim().toLowerCase(),
        anime: character.anime.map(a => a.trim().toLowerCase()),
      }));
  
      const existingCharacters = await Character.find({
        name: { $in: charactersForCheck.map(c => c.name) },
      });
  
      const existingSet = new Set(
        existingCharacters.flatMap(c => c.anime.map(a => `${c.name}-${a}`))
      );
  
      const newCharacters = charactersToInsert.filter(c => 
        !c.anime.some(a => existingSet.has(`${c.name.toLowerCase()}-${a.toLowerCase()}`))
      );
  
      if (newCharacters.length === 0) {
        return res.status(400).json({ error: 'All characters already exist' });
      }
  
      const createdCharacters = await Character.insertMany(newCharacters);
      res.status(201).json(createdCharacters);
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRandomCharacterEndpoint = async (req, res) => {
    try {
        const filters = {};

        if (req.query.bodyType) {
            filters.bodyType = req.query.bodyType;  // Adiciona o filtro de bodyType
        }

        if (req.query.gender) {
            filters.gender = req.query.gender;  // Filtro para gênero, por exemplo
        }

        if (req.query.anime) {
            filters.anime = { $in: [req.query.anime] };  // Filtro para anime
        }

        const randomCharacter = await getRandomCharacter(filters);

        if (!randomCharacter) {
            return res.status(404).json({ error: 'No characters found' });
        }

        res.status(200).json(randomCharacter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCharacters, getCharacters, getRandomCharacterEndpoint };
