import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CatEntity } from '../cat.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CatsLoginDto } from '../Dtos/catsLogin.dto';
import { CatsLoginResponseDto } from '../Dtos/catsLoginResponse.dto';
import { CreateCatDto } from '../Dtos/createCats.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CatJwtSignDto } from '../Dtos/catsJwtSign.dto';

@Injectable()
export class CatsAuthService {
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>,

    private jwtService: JwtService,
  ) {}

  async validateCat(cat: CatsLoginDto): Promise<CatsLoginDto> {
    const repoCat = await this.catRepository.findOneBy({ email: cat.email });
    if (repoCat && (await bcrypt.compare(cat.password, repoCat.password))) {
      const { password, ...otherCatDetails } = repoCat;
      const catsLoginDto = new CatsLoginDto();
      catsLoginDto.catEmail = otherCatDetails.email;
      catsLoginDto.catPassword = password;
      return catsLoginDto;
    }
    throw new UnauthorizedException('Invalid Credintials!!');
  }

  async login(cat: CatsLoginDto) {
    const payload = new CatsLoginResponseDto();
    const repoCat = await this.catRepository.findOneBy({ email: cat.email });
    if (!repoCat)
      throw new NotFoundException('Cat not found in login function!!');
    const jwtDto: CatJwtSignDto = {
      id: repoCat.id,
      email: repoCat.email,
    };
    payload.catToken = this.jwtService.sign(jwtDto);
    return payload;
  }

  async registerCat(cat: CreateCatDto): Promise<CatsLoginResponseDto> {
    const repoCat = await this.catRepository.findOneBy({ email: cat.email });
    if (repoCat)
      throw new ConflictException(
        `Cat with Email: ${cat.email} already there!!`,
      );
    const hashedPw = await bcrypt.hash(cat.password, 10);

    const newCat = this.catRepository.create({
      ...cat,
      password: hashedPw,
    });
    await this.catRepository.save(newCat);
    const catsLoginResponseDto = new CatsLoginResponseDto();
    const jwtDto: CatJwtSignDto = {
      id: newCat.id,
      email: newCat.email,
    };
    catsLoginResponseDto.catToken = this.jwtService.sign(jwtDto);
    catsLoginResponseDto.catStatusMsg = 'Cat created!!';
    return catsLoginResponseDto;
  }
}
