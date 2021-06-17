import { EntityRepository, Repository } from 'typeorm';
import { Video } from '@entities/Video';

@EntityRepository(Video)
class VideosRepository extends Repository<Video> { }
export { VideosRepository };
