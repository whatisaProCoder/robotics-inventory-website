require("dotenv").config()

const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   category VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO categories (category) VALUES
('Microcontrollers'),
('Single Board Computers'),
('Embedded Modules'),
('Sensors'),
('Actuators'),
('Motor Drivers'),
('Power Modules'),
('Batteries'),
('Battery Management'),
('Communication Modules'),
('Vision Systems'),
('Displays'),
('Human Interfaces'),
('Prototyping'),
('PCBs'),
('Wiring & Connectors'),
('Passive Components'),
('Mechanical Parts'),
('Chassis'),
('Tools & Testing'),
('Cooling');
`


async function main() {
  console.log("Populating db...")
  const client = new Client({
    connectionString: process.env.DB_URI
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("✅ DONE!")
}

main()