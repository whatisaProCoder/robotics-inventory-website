// importing pool

const db = require("../db/queries")


// controller functions

const categoriesPageGet = async (req, res) => {
  const categories = await db.getAllCategories()

  res.render("categories", { categories: categories })
}


// exporting the controller functions

module.exports = {
  categoriesPageGet
}