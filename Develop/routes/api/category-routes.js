const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { model: Product, through: ProductTag },
    });

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching categories.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Product.findOne({
      where: { id: req.params.id },
      include: [
        Product,
        {
          model: Category,
        },
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with that ID.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the category.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(201).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the category.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows === 0) {
      res.status(404).json({ message: 'Category not found with that ID.' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the category.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Category not found with that ID.' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the category.' });
  }
});

module.exports = router;
