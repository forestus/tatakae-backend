import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Anime } from './Anime';

@Entity('videos')
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Anime, (anime) => anime.videos)
  anime: Anime;
}
