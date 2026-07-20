import { IsString } from 'class-validator';

export class CatsLoginResponseDto {
  @IsString()
  access_token!: string;

  @IsString()
  status: string = 'Cat loggedin!!';

  set catToken(token: string) {
    this.access_token = token;
  }

  set catStatusMsg(msg: string) {
    this.status = msg;
  }
}
