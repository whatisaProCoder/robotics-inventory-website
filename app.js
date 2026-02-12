// library imports

require("dotenv").config()
const path = require("path")
const express = require("express")


// router imports

const homeRouter = require("./routes/homeRouter")
const categoriesRouter = require("./routes/categoriesRouter")
const componentsRouter = require("./routes/componentsRouter")


// express setup

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))


// router setup

app.use("/", homeRouter)

app.use("/categories", categoriesRouter)

app.use("/components", componentsRouter)


// error handling

app.get("/{*splat}", (req, res) => {
  res.status(404).send("Page not found!")
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode || 500).send(err.message)
})


// finally running the server

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`✅ Server running at PORT : ${PORT}`)
})