// library imports

const { Router } = require("express")


// controller imports

const componentsController = require("../controllers/componentsController")


// creating router

const componentsRouter = Router()


// router setup

componentsRouter.get("/", componentsController.componentsCatalogPageGet)

componentsRouter.get("/new", componentsController.addNewComponentGet)
componentsRouter.post("/new", componentsController.addNewComponentPost)

componentsRouter.get("/:id", componentsController.componentPageGet)

componentsRouter.get("/:id/edit", componentsController.editComponentGet)
componentsRouter.post("/:id/edit", componentsController.editComponentPost)

// default exporting the router

module.exports = componentsRouter