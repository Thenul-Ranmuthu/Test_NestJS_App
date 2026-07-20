import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cat')
export class CatEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  age!: number;

  @Column()
  email!: string;

  @Column({ unique: true })
  password!: string;
}
