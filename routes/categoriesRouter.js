// library imports

const { Router } = require("express")


// controller imports

const categoriesController = require("../controllers/categoriesController")


// creating router

const categoriesRouter = Router()


// router setup

categoriesRouter.get("/", categoriesController.categoriesPageGet)
categoriesRouter.get("/new", categoriesController.addNewCategoryGet)


// default exporting the router

module.exports = categoriesRouter