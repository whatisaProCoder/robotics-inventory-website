require("dotenv").config()

const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   category VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS components (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(300) NOT NULL,
  quantity INTEGER NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

-- =========================
-- Categories (8 Total)
-- =========================

INSERT INTO categories (category) VALUES
('Microcontrollers'),
('Single Board Computers'),
('Sensors'),
('Actuators'),
('Power Modules'),
('Motor Drivers'),
('Communication Modules'),
('Mechanical Parts');

-- =========================
-- Components (32 Total)
-- =========================

INSERT INTO components (name, description, quantity, category_id) VALUES

-- Microcontrollers (1)
('Arduino Uno',
 'A widely used ATmega328P-based development board ideal for prototyping embedded control systems, educational robotics, and sensor-driven automation projects.',
 5, 1),

('ESP32 DevKit',
 'Dual-core microcontroller board featuring integrated WiFi and Bluetooth connectivity, suitable for IoT-enabled robotics and wireless telemetry applications.',
 8, 1),

('STM32F103C8T6',
 'ARM Cortex-M3 based development board offering higher clock speeds and advanced peripheral support for real-time embedded robotics systems.',
 4, 1),

('Arduino Nano',
 'Compact microcontroller board designed for space-constrained robotics builds, providing full Arduino functionality in a smaller form factor.',
 6, 1),

-- Single Board Computers (2)
('Raspberry Pi 4',
 'Quad-core single board computer with 4GB RAM capable of running Linux-based operating systems, commonly used for robotics control and vision processing.',
 3, 2),

('Jetson Nano',
 'Edge AI development platform with GPU acceleration, designed for running neural network inference and computer vision workloads in robotics.',
 2, 2),

('BeagleBone Black',
 'Embedded Linux development board with extensive GPIO access and support for real-time applications in industrial robotics systems.',
 2, 2),

('Orange Pi Zero',
 'Cost-effective compact single board computer suitable for lightweight automation and embedded robotics control applications.',
 3, 2),

-- Sensors (3)
('Ultrasonic Sensor',
 'Distance measurement module operating on ultrasonic pulse reflection principles, widely used for obstacle avoidance and navigation.',
 10, 3),

('IR Sensor Module',
 'Infrared proximity detection module used in line-following robots and short-range obstacle sensing applications.',
 12, 3),

('MPU6050',
 '6-axis inertial measurement unit combining accelerometer and gyroscope sensors for motion tracking and orientation detection.',
 7, 3),

('DHT22',
 'Digital temperature and humidity sensor providing stable environmental monitoring for robotics and automation systems.',
 9, 3),

-- Actuators (4)
('SG90 Servo',
 'Micro servo motor designed for lightweight robotics mechanisms, offering precise positional control using PWM signals.',
 15, 4),

('MG996R Servo',
 'High torque metal gear servo suitable for robotic arms and mechanisms requiring stronger load handling.',
 6, 4),

('12V DC Geared Motor',
 'Geared DC motor with moderate RPM output, commonly used for mobile robot chassis drive systems.',
 5, 4),

('NEMA 17 Stepper Motor',
 'Precision stepper motor providing controlled incremental movement for CNC systems and robotic positioning tasks.',
 4, 4),

-- Power Modules (5)
('LM2596 Buck Converter',
 'Adjustable DC-DC step-down voltage regulator module used for stable power supply conversion in embedded systems.',
 10, 5),

('XL6009 Boost Converter',
 'DC-DC step-up converter module used to increase voltage levels for higher power requirements in robotics builds.',
 8, 5),

('18650 Li-ion Battery',
 'Rechargeable 3.7V lithium-ion battery cell commonly used for portable robotics and energy storage solutions.',
 20, 5),

('2S BMS Protection Board',
 'Battery management system module providing overcharge, over-discharge, and short-circuit protection for lithium battery packs.',
 6, 5),

-- Motor Drivers (6)
('L298N Driver Module',
 'Dual H-bridge motor driver board capable of controlling two DC motors with direction and speed control.',
 7, 6),

('L293D Motor Driver IC',
 'Integrated circuit motor driver suitable for low-current DC motor control applications.',
 12, 6),

('TB6600 Stepper Driver',
 'High-current stepper motor driver module designed for precise control of NEMA-series motors.',
 3, 6),

('30A ESC',
 'Electronic speed controller used to regulate brushless DC motor speed in robotics and UAV systems.',
 5, 6),

-- Communication Modules (7)
('HC-05 Bluetooth Module',
 'Classic Bluetooth communication module used for wireless serial communication between robots and mobile devices.',
 9, 7),

('ESP8266 WiFi Module',
 'WiFi-enabled microcontroller module for enabling internet connectivity in embedded robotics systems.',
 6, 7),

('NRF24L01 RF Module',
 '2.4GHz low-power wireless transceiver module used for short-range communication between robotic nodes.',
 8, 7),

('NEO-6M GPS Module',
 'GPS positioning module providing real-time latitude and longitude data for navigation-based robotics projects.',
 4, 7),

-- Mechanical Parts (8)
('65mm Robot Wheel',
 'Durable plastic wheel designed for DC motor shafts, commonly used in small mobile robot platforms.',
 20, 8),

('Aluminum Shaft Coupler',
 'Metal shaft coupling component used to connect motor shafts to mechanical assemblies securely.',
 10, 8),

('Servo Mount Bracket',
 'Metal mounting bracket designed for securely fixing servo motors within robotic structures.',
 12, 8),

('Acrylic Chassis Plate',
 'Laser-cut acrylic base plate used as the structural foundation for small robotics chassis builds.',
 5, 8);

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