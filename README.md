# Robotics Inventory Management System

A full-stack inventory management web application for robotics components, built as part of The Odin Project curriculum. This project showcases CRUD operations, PostgreSQL database integration, and server-side rendering with EJS.

## Overview

This application allows users to manage a catalog of robotics components organized by categories. Users can add, edit, delete, and search for components, as well as leave comments on individual items. The design intentionally follows a simple, retro aesthetic using vanilla CSS and EJS templates rather than modern frontend frameworks.

## Features

- **Full CRUD Operations**: Create, view, edit, and delete categories and components
- **Search Functionality**: Search components by name or category
- **Comments System**: Add comments to individual components
- **Input Validation**: Server-side validation using express-validator
- **Clean Retro UI**: Simple, intentional design with vanilla CSS

## Usage

- **Home Page**: Browse featured content and use search functionality
- **Categories**: View all categories, add new ones, or edit/delete existing categories
- **Components**: Browse the full catalog, add new components, or manage existing ones
- **Component Details**: View individual component information, leave comments
- **Search**: Find components by name or category using the search bar

## Tech Stack

**Backend:**

- Node.js with Express.js
- PostgreSQL (database)
- EJS (templating engine)
- express-validator (form validation)

**Database:**

- PostgreSQL with pg (node-postgres)
- Connection pooling for efficient database queries

**Frontend:**

- EJS templates for server-side rendering
- Vanilla CSS (intentionally simple and retro design)
- No frontend frameworks (React, Vue, etc.)

## Database Schema

The application uses three main tables:

```sql
categories
├── id (PRIMARY KEY, GENERATED ALWAYS AS IDENTITY)
└── category (VARCHAR(50), UNIQUE, NOT NULL)

components
├── id (PRIMARY KEY, GENERATED ALWAYS AS IDENTITY)
├── name (VARCHAR(50), NOT NULL)
├── description (VARCHAR(300), NOT NULL)
├── price (NUMERIC(10, 2), NOT NULL)
├── quantity (INTEGER, NOT NULL)
└── category_id (FOREIGN KEY → categories.id, ON DELETE CASCADE)

comments
├── id (PRIMARY KEY, GENERATED ALWAYS AS IDENTITY)
├── username (VARCHAR(25), NOT NULL)
├── body (VARCHAR(100), NOT NULL)
└── component_id (FOREIGN KEY → components.id, ON DELETE CASCADE)
```

The schema follows proper normalization principles with foreign key constraints and cascade delete for referential integrity.

## Project Structure

```
├── app.js                          # Application entry point
├── package.json                    # Dependencies and scripts
├── .env                           # Environment variables (DB_URI, PORT)
│
├── controllers/                    # Controller logic (MVC pattern)
│   ├── homeController.js          # Home page controller
│   ├── categoriesController.js    # Category CRUD operations
│   └── componentsController.js    # Component CRUD operations + comments
│
├── routes/                        # Express route definitions
│   ├── homeRouter.js              # Home and search routes
│   ├── categoriesRouter.js        # Category routes
│   └── componentsRouter.js        # Component routes
│
├── db/                            # Database layer
│   ├── pool.js                    # PostgreSQL connection pool
│   ├── queries.js                 # SQL query functions
│   └── populatedb.js             # Database initialization script
│
├── views/                         # EJS templates
│   ├── partials/                  # Reusable components (header, cards, buttons)
│   ├── errors/                    # Error handling views
│   └── *.ejs                      # Page templates
│
└── public/                        # Static assets
    └── styles.css                 # Global styles
```

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd robotics-inventory-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Create a PostgreSQL database
   - Note your database connection string

4. **Configure environment variables**
   Create a `.env` file in the root directory:

   ```env
   DB_URI=postgresql://username:password@localhost:5432/database_name
   PORT=3000
   ```

5. **Initialize the database**

   ```bash
   node db/populatedb.js
   ```

   This creates tables and populates them with sample robotics component data.

6. **Run the application**

   ```bash
   npm start          # Production
   npm run dev        # Development (with auto-reload)
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Development Notes

This was my first full-stack web application integrating:

- PostgreSQL database layer
- Express.js backend with controllers and routes
- EJS templating for server-side rendering
- RESTful API design principles

The DBMS course concepts I learned in college were instrumental in conceptualizing and designing the database schema, particularly understanding:

- Entity-Relationship modeling
- Normalization (avoiding redundancy)
- Foreign key constraints and referential integrity
- Cascade delete operations

The design is intentionally simple and retro, focusing on functionality and clean code rather than modern UI frameworks.

## License

See [LICENSE](LICENSE) file for details.

---

**Project Context**: The Odin Project - Inventory Application Assignment
