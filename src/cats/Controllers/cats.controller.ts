import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CatService } from '../Services/cats.service';
import { CatEntity } from '../cat.entity';
import { JwtAuthGuard } from '../../jwt/jwt_auth.gard';
import { UpdateCatsDto } from '../Dtos/updateCats.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  private readonly logger = new Logger(CatsController.name);

  @Get('intro')
  getCatIntro(): string {
    return this.catService.getCatIntro();
  }

  // @Post('create')
  // createCat(@Body() reqDto: CreateCatDto): Promise<CreateCatDto> {
  //   this.logger.log(`Received: ${JSON.stringify(reqDto)}`);
  //   return this.catService.createCat(reqDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAll(): Promise<CatEntity[]> {
    this.logger.log(`Received: GET ALL CATS`);
    return this.catService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('getOne/:id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<CatEntity> {
    this.logger.log(`Received: Get one cat with Id:${id}`);
    return this.catService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('UpdateCat/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: UpdateCatsDto,
  ) {
    this.logger.log(`Received: Update cat with Id:${id}`);
    this.logger.log(`${JSON.stringify(updateReq)}`);
    return this.catService.update(id, updateReq);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteCat/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Received: Delete cat with Id:${id}`);
    return this.catService.removeCat(id);
  }
}
