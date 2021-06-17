import { Router } from 'express';
const router = Router();

import { GenreController } from '@controllers/GenreController';

const genreController = new GenreController();


//Genre
router.get('/genre', genreController.showByGenre);
router.get('/genre/list/episodes', genreController.listEpisodes);
router.get('/genre/show', genreController.show);
router.get('/genre/letter', genreController.showByLetter);
router.get('/genre/releases', genreController.findVideoReleases);
router.get('/genre/find/video', genreController.findVideo);
router.get('/genre/search', genreController.search);

export { router };
