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
<<<<<<< Updated upstream
  {
    sequelize,
    timestamps: false,
=======
  name: Sequelize.DataTypes.STRING,
  password: {
    type: Sequelize.DataTypes.STRING,
    unique: false,
    allowNull: false
  }}, {
    sequelize,
>>>>>>> Stashed changes
  }
);

export default User;