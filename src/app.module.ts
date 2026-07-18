import { Module } from '@nestjs/common';
import { CatsController } from './cats/Controllers/cats.controller';
import { CatService } from './cats/Services/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cats/Entities/cat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.30.113.63',
      port: 5432,
      username: 'postgres',
      password: 't123',
      database: 'catdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // dev only — auto-creates/updates tables from entities
    }),
    TypeOrmModule.forFeature([CatEntity]),
  ],
  controllers: [CatsController],
  providers: [CatService],
})
export class AppModule {}
