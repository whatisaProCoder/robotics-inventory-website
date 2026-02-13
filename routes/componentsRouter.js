// library imports

const { Router } = require("express")


// controller imports

const componentsController = require("../controllers/componentsController")


// creating router

const componentsRouter = Router()


// router setup

componentsRouter.get("/", componentsController.componentsCatalogPageGet)

componentsRouter.get("/:id", componentsController.componentPageGet)


// default exporting the router

module.exports = componentsRouter