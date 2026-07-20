import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { CatsAuthService } from '../Services/cats.auth.service';
import { CatsLoginDto } from '../Dtos/catsLogin.dto';
import { CatsLoginResponseDto } from '../Dtos/catsLoginResponse.dto';
import { CreateCatDto } from '../Dtos/createCats.dto';

@Controller('cats/auth')
export class CatsAuthController {
  constructor(private catAuthService: CatsAuthService) {}

  private readonly logger = new Logger(CatsAuthController.name);

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: CatsLoginDto): Promise<CatsLoginResponseDto> {
    this.logger.log(`Received: ${JSON.stringify(loginDto)} (for LOGIN)`);
    return this.catAuthService.login(
      await this.catAuthService.validateCat(loginDto),
    );
  }

  @Post('register')
  async register(
    @Body() registerDto: CreateCatDto,
  ): Promise<CatsLoginResponseDto> {
    this.logger.log(`Received: ${JSON.stringify(registerDto)} (for REGISTER)`);
    return this.catAuthService.registerCat(registerDto);
  }
}
