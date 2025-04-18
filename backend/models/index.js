import sequelize from '../config/database.js';
import { Sequelize } from 'sequelize';

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
