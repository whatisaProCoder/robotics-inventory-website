// importing pool

const db = require("../db/queries")


// controller functions

exports.componentsCatalogPageGet = async (req, res) => {
  const componentsCategoryWise = await db.getAllComponents()

  res.render("components-catalog", { componentsCategoryWise: componentsCategoryWise })
}