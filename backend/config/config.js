require('dotenv').config();

module.exports = {
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_USER: process.env.MYSQL_USER || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '@Joseph13101',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'physics_lab',
  FLASK_API_URL: process.env.FLASK_API_URL || 'http://127.0.0.1:5001',
};
