// importing pool

const db = require("../db/queries")


// controller functions

exports.categoriesPageGet = async (req, res) => {
  const categories = await db.getAllCategories()

  res.render("categories", { categories: categories })
}

exports.addNewCategoryGet = (req, res) => {
  res.render("add-category")
}