import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Geo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  lat: string;

  @Column()
  lon: string;
}
