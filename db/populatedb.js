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
  price NUMERIC(10, 2) NOT NULL,
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

INSERT INTO components (name, description, quantity, price, category_id) VALUES

-- Microcontrollers (1)
('Arduino Uno',
 'ATmega328P-based development board widely used for rapid prototyping and educational robotics projects. It provides multiple digital and analog I/O pins with easy USB programming support. Ideal for beginners as well as intermediate embedded system experimentation.',
 5, 549.00, 1),

('ESP32 DevKit',
 'Dual-core microcontroller featuring integrated WiFi and Bluetooth connectivity for IoT-enabled robotics systems. Offers rich peripheral interfaces including SPI, I2C, UART, and ADC. Suitable for wireless control, telemetry, and remote monitoring applications.',
 8, 399.00, 1),

('STM32F103C8T6',
 'ARM Cortex-M3 based microcontroller board delivering higher clock speeds and advanced peripheral flexibility. Commonly used in performance-oriented embedded robotics applications. Supports low-level hardware control and real-time system development.',
 4, 299.00, 1),

('Arduino Nano',
 'Compact ATmega328P board designed for space-constrained robotics builds and breadboard integration. Provides similar functionality to Arduino Uno in a smaller footprint. Well suited for wearable robotics and compact automation systems.',
 6, 349.00, 1),

-- Single Board Computers (2)
('Raspberry Pi 4',
 'Quad-core single board computer with 4GB RAM capable of running full Linux distributions. Frequently used for robotics control, automation dashboards, and lightweight computer vision workloads. Offers HDMI, USB, GPIO, and networking support.',
 3, 4500.00, 2),

('Jetson Nano',
 'Edge AI development platform equipped with GPU acceleration for neural network inference. Designed for computer vision, object detection, and AI-powered robotics applications. Supports CUDA-based development and Linux environments.',
 2, 9000.00, 2),

('BeagleBone Black',
 'Embedded Linux platform offering extensive GPIO access and support for real-time applications. Often used in industrial robotics and automation control environments. Provides stable networking and hardware-level interfacing capabilities.',
 2, 4200.00, 2),

('Orange Pi Zero',
 'Compact and cost-effective single board computer for lightweight automation tasks. Suitable for remote monitoring systems and simple robotics control projects. Provides Ethernet, GPIO, and low-power operation features.',
 3, 1800.00, 2),

-- Sensors (3)
('Ultrasonic Sensor',
 'Distance measurement module based on ultrasonic pulse reflection technology. Commonly used for obstacle avoidance and navigation in mobile robotics platforms. Provides reliable distance readings within short to medium range.',
 10, 85.00, 3),

('IR Sensor Module',
 'Infrared proximity detection module used in line-following and obstacle sensing robots. Detects reflected IR signals to determine surface or object presence. Ideal for short-range detection tasks in compact robotics builds.',
 12, 60.00, 3),

('MPU6050',
 '6-axis inertial measurement unit combining a 3-axis accelerometer and gyroscope. Used for orientation tracking, motion sensing, and stabilization systems. Frequently integrated into drones and balancing robots.',
 7, 120.00, 3),

('DHT22',
 'Digital temperature and humidity sensor delivering calibrated environmental readings. Suitable for weather monitoring stations and environment-aware robotics projects. Offers improved accuracy compared to basic DHT11 modules.',
 9, 180.00, 3),

-- Actuators (4)
('SG90 Servo',
 'Lightweight micro servo motor providing precise positional control via PWM signals. Commonly used in robotic arms, camera mounts, and steering mechanisms. Suitable for low-load movement applications.',
 15, 120.00, 4),

('MG996R Servo',
 'High torque metal gear servo designed for heavier robotic arms and mechanical linkages. Provides improved durability and stronger holding torque. Ideal for medium-load robotics projects.',
 6, 450.00, 4),

('12V DC Geared Motor',
 'Geared DC motor delivering moderate RPM with increased torque output. Widely used in mobile robot chassis drive systems. Suitable for differential drive and small robotic vehicles.',
 5, 650.00, 4),

('NEMA 17 Stepper Motor',
 'Precision stepper motor offering controlled incremental movement. Commonly used in CNC machines, 3D printers, and positioning systems. Provides reliable torque and accurate step control.',
 4, 900.00, 4),

-- Power Modules (5)
('LM2596 Buck Converter',
 'Adjustable DC-DC step-down voltage regulator module for efficient power conversion. Frequently used to stabilize input voltage for embedded systems. Supports wide input range with adjustable output.',
 10, 110.00, 5),

('XL6009 Boost Converter',
 'DC-DC step-up converter module used to increase voltage levels in portable robotics setups. Useful when battery voltage needs boosting for motors or control boards. Offers adjustable output configuration.',
 8, 130.00, 5),

('18650 Li-ion Battery',
 'Rechargeable 3.7V lithium-ion battery cell widely used in portable robotics and DIY battery packs. Offers high energy density and reliable recharge cycles. Suitable for long-duration robotics applications.',
 20, 220.00, 5),

('2S BMS Protection Board',
 'Battery management system providing overcharge, over-discharge, and short-circuit protection. Essential for maintaining safety in lithium battery packs. Improves lifespan and operational stability of power systems.',
 6, 150.00, 5),

-- Motor Drivers (6)
('L298N Driver Module',
 'Dual H-bridge motor driver capable of controlling two DC motors simultaneously. Allows direction and speed control using PWM signals. Commonly used in beginner and intermediate robotics builds.',
 7, 180.00, 6),

('L293D Motor Driver IC',
 'Integrated motor driver IC for controlling low-current DC motors. Compact solution for embedded motor control applications. Suitable for breadboard and small-scale robotics setups.',
 12, 40.00, 6),

('TB6600 Stepper Driver',
 'High-current stepper motor driver module supporting precise control of NEMA-series motors. Designed for CNC and high-torque robotics systems. Provides adjustable current and microstepping options.',
 3, 1250.00, 6),

('30A ESC',
 'Electronic speed controller used to regulate brushless DC motor speed. Common in UAVs, drones, and high-speed robotics platforms. Supports smooth throttle response and stable operation.',
 5, 850.00, 6),

-- Communication Modules (7)
('HC-05 Bluetooth Module',
 'Classic Bluetooth module enabling wireless serial communication. Used for mobile-controlled robotics systems and remote command interfaces. Easy UART integration with microcontrollers.',
 9, 250.00, 7),

('ESP8266 WiFi Module',
 'WiFi-enabled module providing internet connectivity to embedded systems. Frequently used in IoT robotics for cloud communication and monitoring. Supports TCP/IP stack integration.',
 6, 220.00, 7),

('NRF24L01 RF Module',
 '2.4GHz low-power RF transceiver module for short-range wireless communication. Suitable for multi-node robotics systems and remote control links. Offers reliable packet-based data transmission.',
 8, 140.00, 7),

('NEO-6M GPS Module',
 'GPS positioning module delivering real-time latitude and longitude coordinates. Used in navigation, mapping, and autonomous robotics applications. Provides UART interface for microcontroller integration.',
 4, 700.00, 7),

-- Mechanical Parts (8)
('65mm Robot Wheel',
 'Durable plastic wheel compatible with common DC motor shafts. Frequently used in mobile robotics platforms and educational kits. Provides stable traction for small chassis builds.',
 20, 75.00, 8),

('Aluminum Shaft Coupler',
 'Precision-machined aluminum coupler for connecting motor shafts to mechanical assemblies. Ensures firm grip and stable torque transmission. Suitable for CNC and robotics motion systems.',
 10, 95.00, 8),

('Servo Mount Bracket',
 'Metal mounting bracket designed to securely fix servo motors within robotic frames. Provides stable alignment and structural support. Compatible with standard micro and high-torque servos.',
 12, 110.00, 8),

('Acrylic Chassis Plate',
 'Laser-cut acrylic base plate serving as structural foundation for compact robotics builds. Lightweight yet rigid construction for easy assembly. Suitable for DIY mobile robot platforms.',
 5, 350.00, 8);

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