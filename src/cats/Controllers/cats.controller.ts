import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CatService } from '../Services/cats.service';
import { CreateCatDto } from '../Dtos/createCatDto';
import { CatEntity } from '../cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  private readonly logger = new Logger(CatsController.name);

  @Get('intro')
  getCatIntro(): string {
    return this.catService.getCatIntro();
  }

  @Post('create')
  createCat(@Body() reqDto: CreateCatDto): Promise<CreateCatDto> {
    this.logger.log(`Received: ${JSON.stringify(reqDto)}`);
    return this.catService.createCat(reqDto);
  }

  @Get('all')
  getAll(): Promise<CatEntity[]> {
    this.logger.log(`Received: GET ALL CATS`);
    return this.catService.getAll();
  }

  @Get('getOne/:id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<CatEntity> {
    this.logger.log(`Received: Get one cat with Id:${id}`);
    return this.catService.getOne(id);
  }

  @Patch('UpdateCat/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: Partial<CreateCatDto>,
  ) {
    this.logger.log(`Received: Update cat with Id:${id}`);
    this.logger.log(`${JSON.stringify(updateReq)}`);
    return this.catService.update(id, updateReq);
  }

  @Delete('deleteCat/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Received: Delete cat with Id:${id}`);
    return this.catService.removeCat(id);
  }
}
