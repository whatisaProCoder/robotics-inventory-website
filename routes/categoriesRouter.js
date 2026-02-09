// library imports

const { Router } = require("express")


// controller imports

const categoriesController = require("../controllers/categoriesController")


// creating router

const categoriesRouter = Router()


// router setup

categoriesRouter.get("/", categoriesController.categoriesPageGet)


// default exporting the router

module.exports = categoriesRouter