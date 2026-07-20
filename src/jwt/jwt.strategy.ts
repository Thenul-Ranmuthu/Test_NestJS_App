import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt_secret(),
    });
  }

  validate(payload: any) {
    return { userId: payload.id, email: payload.email };
  }
}

export const jwt_secret = () => {
  if (!process.env.JWT_SECRET)
    throw new Error('Error while fetching JWT_SECRET!!');
  return process.env.JWT_SECRET;
};
