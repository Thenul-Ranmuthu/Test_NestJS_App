import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwt_secret, JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PassportModule,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    JwtModule.register({
      secret: jwt_secret(),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class JwtAuthModule {}
