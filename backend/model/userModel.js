// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/config'); // Your Sequelize instance

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    phoneNo: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },

    type: {
        type: DataTypes.ENUM('employee', 'manager'),
        defaultValue: 'employee',
    },

    role: {
        type: DataTypes.ENUM(
            'backend developer',
            'frontend developer',
            'uiux develper',
            'developer'
        ),
        defaultValue: 'developer', // Fixed typo from 'deverloper'
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users', // explicitly set table name if needed
    timestamps: false,  // set true if you want createdAt, updatedAt
});

module.exports = User;
