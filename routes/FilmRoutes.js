import express from "express";
import { getFilms, getFilmById, saveFilm, updateFilm, deleteFilm, getFilmByGenre, getFilmByEndpoint } from '../controllers/FilmController.js';

const router = express.Router();

router.get('/api/films', getFilms)
router.get('/api/films/genre/:genre', getFilmByGenre)
router.get('/api/films/:id', getFilmById)
router.get('/api/films/film/:name', getFilmByName)
router.get('/api/films/film/:endpoint', getFilmByEndpoint)
router.post('/api/films/', saveFilm);
router.patch('/api/films/:id', updateFilm);
router.delete('/api/films/:id', deleteFilm);

export default router;