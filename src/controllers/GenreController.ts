import { Request, Response } from 'express';
import { Like } from 'typeorm';
import { AnimesRepository } from '@repositories/AnimesRepository';
import { VideosRepository } from '@repositories/VideosRepository';
import { DescriptionsRepository } from '@repositories/DescriptionsRepository';
import { searchDescription } from '@services/searchService/searchDescription';
import { AppError } from '@errors/AppError';
import { prepareConnection } from '@db/db';

class GenreController {
  async showByLetter(request: Request, response: Response) {
    let { letter } = request.body;
    const db = await prepareConnection();
    const animesRepository = db.getCustomRepository(AnimesRepository);
    letter = letter.toUpperCase() + `%`;
    const all = await animesRepository.find({
      where: { name: Like(letter) },
      order: { name: 'ASC' }
    });
    return response.json(all);
  }

  async listEpisodes(request: Request, response: Response) {
    let { name } = request.body;
    const db = await prepareConnection();
    const animesRepository = db.getCustomRepository(AnimesRepository);
    const videosRepository = db.getCustomRepository(VideosRepository);
    const all = await animesRepository.find({
      where: { name: name },
      order: { name: 'ASC' },
      relations: ["description", "videos"]
    });
    const videos = await videosRepository.find({
      where: {
        anime: all[0].id
      },
      order: {
        createdAt: 'ASC'
      },
      cache: true
    });
    all[0].videos = [...videos]
    return response.json(all);
  }
  async showByGenre(request: Request, response: Response) {
    let { genres } = request.body;
    const db = await prepareConnection();
    const descriptionsRepository = db.getCustomRepository(DescriptionsRepository);
    genres = `%` + genres + `%`;
    const all = await descriptionsRepository.find({
      where: { genres: Like(genres) },
      order: { name: 'ASC' }
    });
    return response.json(all);
  }
  async show(request: Request, response: Response) {
    const { skiped, amount } = request.body;
    const db = await prepareConnection();
    const animesRepository = db.getCustomRepository(AnimesRepository);
    const all = await animesRepository.find({
      order: {
        createdAt: 'DESC'
      },
      cache: true,
      skip: skiped,
      take: amount
    });
    return response.json(all);
  }

  async findVideoReleases(request: Request, response: Response) {
    const { skiped, amount } = request.body;
    const db = await prepareConnection();
    const videosRepository = db.getCustomRepository(VideosRepository);
    const videoAlreadyExists = await videosRepository.find({
      order: {
        createdAt: 'DESC'
      },
      cache: true,
      skip: skiped,
      take: amount
    });
    if (!videoAlreadyExists) {
      throw new AppError('Anime not Found!', 404);
    }
    return response.status(200).json(videoAlreadyExists);
  }

  async findVideo(request: Request, response: Response) {
    const { anime } = request.body;
    const db = await prepareConnection();
    let animesRepository = db.getCustomRepository(AnimesRepository);
    let animeAlreadyExists = await animesRepository.findOne({
      where: { name: anime }
    });
    if (!animeAlreadyExists) {
      throw new AppError('Anime not Found!', 404);
    }
    return response.status(200).json(animeAlreadyExists);
  }

  async search(request: Request, response: Response) {
    let { anime, maxResults } = request.body;
    if (typeof maxResults == 'undefined') {
      maxResults = 10;
    }
    const search = await searchDescription(anime, maxResults);
    return response.json(search).status(200);
  }
}
export { GenreController };
