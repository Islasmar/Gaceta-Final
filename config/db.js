import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config({path:'.env'})

const db = new Sequelize(process.env.BD_NAME,process.env.BD_USER,process.env.BD_PASSWORD,{
    host: process.env.BD_HOST,
    port: "3309",
    dialect: 'mysql',
    define: {
        timestamps: "America/Mexico_City"
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
    operatorsAliases: false
});

export default db;