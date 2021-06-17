import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Anime } from './Anime';

@Entity('descriptions')
export class Description {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  episodes: string;

  @Column()
  picture: string;

  @Column()
  score: string;

  @Column()
  aired: string;

  @Column()
  status: string;

  @Column()
  genres: string;

  @Column()
  synopsys: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Anime, (anime) => anime.description)
  anime: Anime;
}
