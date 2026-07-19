import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from '../cat.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from '../Dtos/createCatDto';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>,
  ) {}

  private readonly logger = new Logger(CatService.name);

  async removeCat(id: number): Promise<void> {
    const result = await this.catRepository.delete(id);
    if (result.affected === 0) {
      this.logger.log(`Cat with id:${id} not found!!`);
      throw new NotFoundException(`Cat with id:${id} not found!!`);
    }
  }

  async update(
    id: number,
    updateReq: Partial<CreateCatDto>,
  ): Promise<CatEntity> {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      this.logger.log(`Cat with id:${id} not found!!`);
      throw new NotFoundException(`Cat with id:${id} not found!!`);
    }
    Object.assign(cat, updateReq);
    return this.catRepository.save(cat);
  }

  async getOne(id: number): Promise<CatEntity> {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      this.logger.log(`Cat with id:${id} not found!!`);
      throw new NotFoundException(`Cat with id:${id} not found!!`);
    }
    return cat;
  }

  getAll(): Promise<CatEntity[]> {
    return this.catRepository.find();
  }

  createCat(reqDto: CreateCatDto): Promise<CreateCatDto> {
    const cat = this.catRepository.create(reqDto);
    return this.catRepository.save(cat);
  }

  getCatIntro(): string {
    return 'Hello from cats service';
  }
}
