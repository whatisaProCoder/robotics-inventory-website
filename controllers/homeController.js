// controller functions

const homePageGet = (req, res) => {
  res.render("home")
}


// exporting the controller functions

module.exports = {
  homePageGet
}