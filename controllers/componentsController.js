// importing pool

const db = require("../db/queries")


// controller functions

exports.componentsCatalogPageGet = async (req, res) => {
  const componentsCategoryWise = await db.getAllComponents()

  console.log(componentsCategoryWise)

  res.render("components-catalog")
}