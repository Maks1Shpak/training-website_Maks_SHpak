const express = require('express');
const router = express.Router();
const Whale = require('../models/Whale');

// ...existing routes...

router.put('/api/whales/:id', async (req, res) => {
  const id = req.params.id;
  const { name, species, age } = req.body;

  // Перевірка наявності всіх необхідних полів
  if (!name || !species || typeof age !== 'number') {
    return res.status(400).json({ error: 'Invalid whale data' });
  }

  try {
    // Знайти кита за id
    const whale = await Whale.findById(id);
    if (!whale) {
      return res.status(404).json({ error: 'Whale not found' });
    }

    // Оновити всі поля
    whale.name = name;
    whale.species = species;
    whale.age = age;
    await whale.save();

    return res.status(200).json(whale);
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ...existing routes...

module.exports = router;