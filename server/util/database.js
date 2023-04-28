// const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//     process.env.PG_DB,
//     process.env.PG_USER,
//     process.env.PG_PASSWORD,
//     {
//         host: process.env.PG_HOST,
//         dialect: 'postgres',
//     }
// );

// module.exports = sequelize;


const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
    }
);

module.exports = sequelize;