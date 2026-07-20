import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { CatsController } from './Controllers/cats.controller';
import { CatService } from './Services/cats.service';
import { CatsAuthController } from './Controllers/cats.auth.controller';
import { CatsAuthService } from './Services/cats.auth.service';
import { JwtAuthModule } from 'src/jwt/jwt_auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity]), JwtAuthModule],
  controllers: [CatsController, CatsAuthController],
  providers: [CatService, CatsAuthService],
})
export class CatsModule {}
