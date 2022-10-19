import { Sequelize } from 'sequelize';
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Film = db.define(
  'film',
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    sinopsis: DataTypes.TEXT('long'),
    genre: DataTypes.STRING,
    url: DataTypes.STRING,
    background_url: DataTypes.STRING,
    stream_url: DataTypes.TEXT('long'),
    rating: DataTypes.INTEGER,
    endpoint: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Film;

(async () => {
  await db.sync();
})();
