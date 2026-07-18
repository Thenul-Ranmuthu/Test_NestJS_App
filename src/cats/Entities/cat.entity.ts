import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat')
export class CatEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: number;
}
