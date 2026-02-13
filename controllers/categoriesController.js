// importing pool

const db = require("../db/queries")


// validation
const { body, validationResult, matchedData } = require("express-validator")

const validateCategory = [
  body("categoryName").trim()
    .notEmpty().withMessage("Category name cannot be empty.")
    .isLength({ max: "50" }).withMessage("Category name must be below 50 characters.")
]


// controller functions

exports.categoriesPageGet = async (req, res) => {
  const categories = await db.getAllCategories()

  res.render("categories", { categories: categories })
}

exports.addNewCategoryGet = (req, res) => {
  res.render("add-category")
}

exports.addNewCategoryPost = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("add-category",
        {
          categoryName: req.body.categoryName,
          errors: errors.array()
        })
    }

    const { categoryName } = matchedData(req)

    await db.addCategory({ categoryName })

    res.redirect("/categories")
  }
]

exports.editCategoryGet = async (req, res) => {
  const categoryID = req.params.id

  const categoryObject = await db.getCategory({ id: categoryID })

  res.render("edit-category", { categoryID: categoryObject.id, categoryName: categoryObject.category })
}

exports.editCategoryPost = [
  validateCategory,
  async (req, res) => {
    const id = req.params.id

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("edit-category",
        {
          categoryID: id,
          categoryName: req.body.categoryName,
          errors: errors.array()
        })
    }

    const { categoryName } = matchedData(req)

    await db.updateCategory({ id, categoryName })

    res.redirect("/categories")
  }
]

exports.deleteCategoryPost = async (req, res) => {
  const id = req.params.id
  const passcode = req.body.passcode

  if (passcode === process.env.PASSCODE) {
    await db.deleteCategory({ id })
    return res.redirect("/categories")
  } else {
    const categoryObject = await db.getCategory({ id })
    return res.status(400).render("edit-category",
      {
        categoryID: id,
        categoryName: categoryObject.category,
        deletionErrors: [{ msg: "Incorrect passcode, try again!" }]
      })
  }
}