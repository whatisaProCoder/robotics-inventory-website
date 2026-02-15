// importing pool

const db = require("../db/queries")



// validation
const { body, validationResult, matchedData } = require("express-validator")

const validateComponent = [
  body("category")
    .notEmpty().withMessage("Must specify the category of the component.")
    .isNumeric().withMessage("Category must be selected."),
  body("componentName").trim()
    .notEmpty().withMessage("Component name cannot be empty.")
    .isLength({ max: 50 }).withMessage("Name must be below 50 characters."),
  body("description").trim()
    .notEmpty().withMessage("Description cannot be empty.")
    .isLength({ max: 300 }).withMessage("Description must be below 300 characters."),
  body("price").trim()
    .notEmpty().withMessage("Price must be specified.")
    .isFloat({ min: 0 }).withMessage("Price cannot be negative."),
  body("quantity").trim()
    .notEmpty().withMessage("Quantity cannot be empty.")
]


// controller functions

exports.componentsCatalogPageGet = async (req, res) => {
  const componentsCategoryWise = await db.getAllComponents()

  res.render("components-catalog", { componentsCategoryWise: componentsCategoryWise })
}

exports.componentPageGet = async (req, res) => {
  const id = req.params.id

  const component = await db.getComponent({ id })

  res.render("component", { component: component })
}

exports.addNewComponentGet = async (req, res) => {
  const categories = await db.getAllCategories()

  res.render("add-component", { categories: categories })
}

exports.addNewComponentPost = [
  validateComponent,
  async (req, res) => {
    const categories = await db.getAllCategories()

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("add-component",
        {
          categories: categories,
          errors: errors.array()
        })
    }

    const { category, componentName, description, price, quantity } = matchedData(req)

    const newComponent = await db.addComponent({ name: componentName, description, price, quantity, category_id: category })

    res.redirect(`/components/${newComponent.id}`)
  }
]

exports.editComponentGet = async (req, res) => {
  const componentID = req.params.id

  const categories = await db.getAllCategories()
  const component = await db.getComponent({ id: componentID })

  res.render("edit-component",
    {
      categories: categories,
      component: component
    })
}


exports.editComponentPost = [
  validateComponent,
  async (req, res) => {
    const componentID = req.params.id

    const categories = await db.getAllCategories()
    const component = await db.getComponent({ id: componentID })

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render("edit-component",
        {
          categories: categories,
          component: component,
          errors: errors.array()
        })
    }

    const { category, componentName, description, price, quantity } = matchedData(req)

    await db.updateComponent({ id: componentID, name: componentName, description, price, quantity, category_id: category })

    res.redirect(`/components/${componentID}`)
  }
]

exports.searchComponentsGet = async (req, res) => {
  const query = req.query.query

  const searchResults = await db.searchComponent({ searchKeyword: query })

  res.render("search", { componentsCategoryWise: searchResults, query: query })
}

exports.deleteComponentPost = async (req, res) => {
  const id = req.params.id
  const passcode = req.body.passcode

  if (passcode === process.env.PASSCODE) {
    await db.deleteComponent({ id })
    return res.redirect("/components")
  } else {
    return res.status(400).redirect(`/components/${id}`)
  }
}