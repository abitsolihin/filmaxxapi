import express from "express";
import { getFilms, getFilmById, saveFilm, updateFilm, deleteFilm, getFilmByGenre, getFilmByName } from '../controllers/FilmController.js';

const router = express.Router();

router.get('/api/film', getFilms)
router.get('/api/film/genre/:genre', getFilmByGenre)
router.get('/api/film/:id', getFilmById)
router.get('/api/film/:name', getFilmByName)
router.post('/api/film/', saveFilm);
router.patch('/api/film/:id', updateFilm);
router.delete('/api/film/:id', deleteFilm);

export default router;