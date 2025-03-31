const Character = require('../models/Character');

const getRandomCharacter = async (filters = {}) => {
    try {
        const query = { ...filters };

        if (filters.bodyType) {
            query["appearance.bodyType"] = filters.bodyType;
        }
        
        const count = await Character.countDocuments(query);
        if (count === 0) {
            throw new Error('No characters found matching the filter');
        }

        const randomIndex = Math.floor(Math.random() * count);

        const randomCharacter = await Character.findOne(query).skip(randomIndex);
        return randomCharacter;
    } catch (error) {
        throw new Error('Failed to fetch random character');
    }
};

module.exports = { getRandomCharacter };
