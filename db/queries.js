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

async function addComponent({ name, description, quantity, price, category_id }) {
  const { rows } = await pool.query(
    "INSERT INTO components (name, description, price, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, price, quantity, category_id]
  )
  return rows[0]
}

async function getComponent({ id }) {
  const { rows } = await pool.query(
    "SELECT co.id, co.name, co.description, co.price, co.quantity, ca.id as category_id, ca.category FROM components co join categories ca on co.category_id = ca.id where co.id = $1",
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

async function updateComponent({ id, name, description, price, quantity, category_id }) {
  await pool.query(
    "UPDATE components SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6",
    [name, description, price, quantity, category_id, id]
  )
}

async function deleteComponent({ id }) {
  await pool.query("DELETE FROM components WHERE id = $1", [id])
}


async function searchComponent({ searchKeyword }) {
  if (!searchKeyword || searchKeyword.trim() === "") {
    return []
  }


  const categories = getAllCategories()

  const { rows } = await pool.query(
    "SELECT * FROM components WHERE name ILIKE '%' || $1 || '%' ORDER BY name ASC",
    [searchKeyword]
  )

  if (rows.length === 0) {
    return []
  }

  return (await categories).map(category => {
    return {
      category_id: category.id,
      category: category.category,
      components: rows.filter((component) => component.category_id === category.id)
    }
  }).filter(componentsPerCategory => componentsPerCategory.components.length !== 0)
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