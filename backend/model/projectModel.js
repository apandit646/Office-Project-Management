// models/Project.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/config'); // your Sequelize instance

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },

    clientName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    startDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    endDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('ongoing', 'completed', 'on hold'),
        defaultValue: 'ongoing',
    },

    description: {
        type: DataTypes.TEXT,
    },

    managerId: {
        type: DataTypes.INTEGER, // ✅ not STRING
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    }
}, {
    tableName: 'project_table', // match original table name
    timestamps: false, // disable createdAt and updatedAt
});


module.exports = Project;
