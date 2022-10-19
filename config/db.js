import { Sequelize } from 'sequelize';

const db = new Sequelize('railway', 'root', '7Br5fUh2ODeSvrU9zyrO', {
  host: 'containers-us-west-32.railway.app',
  dialect: 'mysql',
  port: 5821,
});
// const db = new Sequelize('web_film', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

export default db;
