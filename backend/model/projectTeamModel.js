const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');
// import your Sequelize instance

const ProjectTeam = sequelize.define('ProjectTeam', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'project_table', // table name (not model name)
            key: 'id'
        }
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // table name (not model name)
            key: 'id'
        }
    },
    role: {
        type: DataTypes.ENUM('developer', 'designer', 'tester', 'manager'),
        allowNull: false
    }
}, {
    tableName: 'project_team',
    timestamps: false
});

module.exports = ProjectTeam;
