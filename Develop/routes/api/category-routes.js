const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  });
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId, {
    include: [
      {
        model: Product,
      },
    ],
  });
  res.send(category);
});

router.post("/", async (req, res) => {
  // create a new category
  const category = await Category.create(req.body);
  res.send(category);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const [count, data] = await Category.update(req.body, {
    where: { id: categoryId },
  });
  if (count > 0) {
    res.send("Category updated successfully!");
  } else {
    res.send("Nothing to be updated!");
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;
  const category = await Category.destroy({
    where: {
      id: categoryId,
    },
  });
  if (category > 0) {
    res.send("Category deleted successfully!");
  } else {
    res.send("Nothing to  deleted!");
  }
});

module.exports = router;