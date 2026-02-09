const dotenv = require("dotenv")
const path = require("path")
const express = require("express")

const homeRouter = require("./routes/homeRouter")

dotenv.config()

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))

app.use("/", homeRouter)

app.get("/{*splat}", (req, res) => {
  res.status(404).send("Page not found!")
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.statusCode || 500).send(err.message)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`✅ Server running at PORT : ${PORT}`)
})