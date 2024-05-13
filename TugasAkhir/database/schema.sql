CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(50) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- INSERT INTO tasks (user_id, title, completed) VALUES 
-- (1, 'Learn Node.js', 0),
-- (1, 'Learn Express.js', 0),
-- (1, 'Learn MySQL', 1),
-- (1, 'Learn REST API', 0),
-- (1, 'Finish Project Capstone', 0);