import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { SearchProductDto } from './dto/search-product.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async paginate(dto: SearchProductDto) {
    const qb = this.repository.createQueryBuilder('c');

    if (dto.title) {
      qb.andWhere(`c.title ILIKE :title`);
      qb.setParameters({
        title: `%${dto.title}%`,
      });
    }

    if (dto.categories) {
      const arr = dto.categories.split(',');
      const categories = [...arr.map((item) => parseInt(item))];

      qb.andWhere('c.category IN (:...categories)', { categories });
    }

    const limit = dto.limit;
    const route = 'https://protein-nest.up.railway.app/products';
    const page = dto.page;

    return paginate<ProductEntity>(qb, { limit, page, route });
  }

  findById(id: number) {
    return this.repository.findOneBy({ id: id });
  }
}
