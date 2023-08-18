const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories along with their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product, // Include associated Products
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get one category by its `id` value along with its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product, // Include associated Products
    });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    await category.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
