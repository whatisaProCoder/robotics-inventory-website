// library imports

const { Router } = require("express")


// controller imports

const homeController = require("../controllers/homeController")


// creating router

const homeRouter = Router()


// router setup

homeRouter.get("/", homeController.homePageGet)


// default exporting the router

module.exports = homeRouter