import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Description } from './Description';
import { Torrent } from './Torrent';
import { Video } from './Video';

@Entity('animes')
export class Anime extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Torrent, (torrent) => torrent.anime)
  torrents: Torrent[];

  @OneToMany(() => Video, (video) => video.anime)
  videos: Video[];

  @OneToOne(() => Description)
  @JoinColumn()
  description: Description;
}
