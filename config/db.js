import { Sequelize } from 'sequelize';

const db = new Sequelize('railway', 'root', '0dbgwrf1Brt2rYPYL7xB', {
  host: 'containers-us-west-70.railway.app',
  dialect: 'mysql',
  port: 7433,
});
// const db = new Sequelize('web_film', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

export default db;
