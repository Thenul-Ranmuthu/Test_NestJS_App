import 'dotenv/config';
import { Module } from '@nestjs/common';
import { CatsController } from './cats/Controllers/cats.controller';
import { CatService } from './cats/Services/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cats/Entities/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // dev only — auto-creates/updates tables from entities
    }),
    TypeOrmModule.forFeature([CatEntity]),
  ],
  controllers: [CatsController],
  providers: [CatService],
})
export class AppModule {}
