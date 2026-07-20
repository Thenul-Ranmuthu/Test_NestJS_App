import { IsString } from 'class-validator';

export class CatsLoginDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  set catEmail(em: string) {
    this.email = em;
  }

  set catPassword(pass: string) {
    this.password = pass;
  }
}
