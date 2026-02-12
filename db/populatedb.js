require("dotenv").config()

const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   category VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO categories (category) VALUES
('Control & Processing'),
('Sensors'),
('Actuators'),
('Power & Energy'),
('Motor Drivers & Controllers'),
('Communication Modules'),
('Vision & Imaging'),
('Displays & User Interfaces'),
('Prototyping & PCB'),
('Wiring & Connectors'),
('Mechanical Components'),
('Chassis & Structural Parts'),
('Tools & Equipment'),
('Cooling & Thermal Management')
`;


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