// library imports

const { Router } = require("express")


// controller imports

const categoriesController = require("../controllers/categoriesController")


// creating router

const categoriesRouter = Router()


// router setup

categoriesRouter.get("/", categoriesController.categoriesPageGet)

categoriesRouter.get("/new", categoriesController.addNewCategoryGet)
categoriesRouter.post("/new", categoriesController.addNewCategoryPost)

categoriesRouter.get("/:id/edit", categoriesController.editCategoryGet)
categoriesRouter.post("/:id/edit", categoriesController.editCategoryPost)

categoriesRouter.post("/:id/delete", categoriesController.deleteCategoryPost)


// default exporting the router

module.exports = categoriesRouter