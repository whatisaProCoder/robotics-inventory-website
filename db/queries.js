const pool = require("./pool")

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY category ASC")
  return rows;
}

async function addCategory({ categoryName }) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [categoryName])
}

async function getCategory({ id }) {
  const { rows } = await pool.query("SELECT * FROM categories where id = $1", [id])
  return rows[0]
}

async function updateCategory({ id, categoryName }) {
  await pool.query("UPDATE categories SET category = $1 WHERE id = $2", [categoryName, id])
}

async function deleteCategory({ id }) {
  await pool.query("DELETE FROM categories where id = $1", [id])
}

module.exports = {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory
}