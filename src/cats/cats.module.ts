import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { CatsController } from './Controllers/cats.controller';
import { CatService } from './Services/cats.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatService],
})
export class CatsModule {}
