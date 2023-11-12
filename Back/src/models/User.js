import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

export default User;