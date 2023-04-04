import {Sequelize} from "sequelize"

const db = new Sequelize('metavers', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
});

export default db;