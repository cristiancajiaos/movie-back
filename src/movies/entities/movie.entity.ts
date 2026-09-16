import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UpdateDateColumn } from "typeorm/browser";
import { CreateDateColumn } from "typeorm/browser";

@Entity({name: 'movies'})
export class Movie {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text'})
  title: string;

  @Column({type: 'integer'})
  year: number;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updateAt: number;
}
