import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { CatsController } from './Controllers/cats.controller';
import { CatService } from './Services/cats.service';
import { CatsAuthController } from './Controllers/cats.auth.controller';
import { CatsAuthService } from './Services/cats.auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret, JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwt_secret(),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CatsController, CatsAuthController],
  providers: [CatService, CatsAuthService, JwtStrategy],
})
export class CatsModule {}
