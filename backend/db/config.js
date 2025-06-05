// db.js (Sequelize setup for MySQL)
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projectmanagement', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Connected to MySQL via Sequelize');
    })
    .catch((err) => {
        console.error('❌ Unable to connect:', err);
    });

module.exports = sequelize;
