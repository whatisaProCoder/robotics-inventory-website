const pool = require("./pool")

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY category ASC")
  return rows
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

async function addComponent({ name, description, quantity, category_id }) {
  const { rows } = await pool.query(
    "INSERT INTO components (name, description, quantity, category_id) VALUES ($1, $2, $3, $4)",
    [name, description, quantity, category_id]
  )
  return rows[0]
}

async function getComponent({ id }) {
  const { rows } = await pool.query(
    "SELECT co.id, co.name, co.description, co.quantity, ca.id as category_id, ca.category FROM components co join categories ca on co.category_id = ca.id where co.id = $1",
    [id]
  )
  return rows[0]
}

async function getComponentsCategoryWise({ categoryID }) {
  const { rows } = await pool.query("SELECT * FROM components WHERE category_id = $1 ORDER BY name ASC", [categoryID])
  return rows
}

async function getAllComponents() {
  const categories = await getAllCategories()

  return Promise.all(
    categories.map(async (category) => ({
      category_id: category.id,
      category: category.category,
      components: await getComponentsCategoryWise({
        categoryID: category.id
      })
    }))
  )
}

async function updateComponent({ id, name, description, quantity, category_id }) {
  await pool.query(
    "UPDATE components SET name = $1, description = $2, quantity = $3, category_id = $4 WHERE id = $5",
    [name, description, quantity, category_id, id]
  )
}

async function deleteComponent({ id }) {
  await pool.query("DELETE FROM components WHERE id = $1", [id])
}


async function searchComponent({ searchKeyword }) {
  const { rows } = await pool.query(
    "SELECT * FROM components WHERE name ILIKE '%' || $1 || '%' ORDER BY name ASC",
    [searchKeyword]
  )
  return rows
}

module.exports = {
  getAllCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  addComponent,
  getComponent,
  getAllComponents,
  getComponentsCategoryWise,
  updateComponent,
  deleteComponent,
  searchComponent
}