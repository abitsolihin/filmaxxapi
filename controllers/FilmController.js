import Film from '../models/FilmModel.js';
import fs from 'fs';
import path from 'path';

export const getFilms = async (req, res) => {
  try {
    const response = await Film.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFilmByName = async (req, res) => {
  try {
    const response = await Film.findAll({
      where: {
        name: req.params.name,
      },
    });
    res.json(response);
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const getFilmByGenre = async (req, res) => {
  try {
    const response = await Film.findOne({
      where: {
        genre: req.params.genre,
      },
    });
    res.json(response);
    console.log(response)
  } catch (error) {
    console.log(error.message);
  }
};

export const getFilmById = async (req, res) => {
  try {
    const response = await Film.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const saveFilm = async (req, res) => {
  if (req.files == null) return res.status(400).json({ msg: 'No File Uploaded' });
  const name = req.body.title;
  const sinopsis = req.body.sinopsis;
  const genre = req.body.genre;
  const stream_url = req.body.stream_url;
  const background_url = req.body.background_url;
  const rating = req.body.rating;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  const allowedType = ['.png,', '.jpg', '.webp', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid Images' });
  if (fileSize > 8000000) return res.status(422).json({ msg: 'Image must be less than 8MB' });

  file.mv(`./public/Images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Film.create({ name: name, image: fileName, sinopsis: sinopsis, genre: genre,background_url: background_url, stream_url: stream_url, rating: rating, url: url });
      res.status(201).json({ msg: 'Film berhasil Di Tambahkan' });
    } catch (error) {
      console.log(error.message);
    }
  });
};
export const updateFilm = async (req, res) => {
  const film = await Film.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!film) return res.status(404).json({ msg: 'No Data Found' });
  let fileName = '';
  if (req.files === null) {
    fileName = Film.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png,', '.jpg', '.webp', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: 'Invalid Images' });
    if (fileSize > 8000000) return res.status(422).json({ msg: 'Image must be less than 8MB' });

    const filePath = `./public/images/${film.image}`;
    fs.unlinkSync(filePath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.title;
  const sinopsis = req.body.sinopsis;
  const genre = req.body.genre;
  const stream_url = req.body.stream_url;
  const background_url = req.body.background_url;
  const rating = req.body.rating;
  const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
  try {
    await Film.update(
      { name: name, image: fileName, sinopsis: sinopsis, genre: genre,background_url: background_url, stream_url: stream_url, rating: rating, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: 'Product Updated Succesfully' });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteFilm = async (req, res) => {
  const film = await Film.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!film) return res.status(404).json({ msg: 'No Data Found' });
  try {
    const filePath = `./public/images/${film.image}`;
    fs.unlinkSync(filePath);
    await Film.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: 'Film Deleted Succesfully' });
  } catch (error) {
    console.log(error.message);
  }
};
