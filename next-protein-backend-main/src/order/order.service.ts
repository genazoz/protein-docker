import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { SearchOrderDto } from './dto/search-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private repository: Repository<OrderEntity>,
  ) {}

  create(dto: CreateOrderDto, userId: number) {
    return this.repository.save({
      status: dto.status,
      price: dto.price,
      count: dto.count,
      user: { id: userId },
    });
  }

  findAll() {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async search(dto: SearchOrderDto) {
    const qb = this.repository.createQueryBuilder('p');

    qb.leftJoinAndSelect('p.user', 'user');

    if (dto.status) {
      qb.where(`p.status ILIKE :status`);
    }

    if (dto.price) {
      qb.andWhere(`p.price ILIKE :price`);
    }

    if (dto.count) {
      qb.andWhere(`p.count ILIKE :count`);
    }

    qb.setParameters({
      status: `%${dto.status}%`,
      price: `%${dto.price}%`,
      count: `%${dto.count}%`,
    });

    const [items, total] = await qb.getManyAndCount();

    return { items, total };
  }

  async findByUser(userId: number) {
    return this.repository.findBy({ user: { id: userId } });
  }

  async popular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('id', 'DESC');
    qb.limit(10);

    const [items, total] = await qb.getManyAndCount();

    return [items, total];
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  async update(id: number, dto: UpdateOrderDto, userId: number) {
    const find = await this.repository.findOneBy({ id: +id });

    if (!find) {
      throw new NotFoundException('Статья не найдена');
    }

    return this.repository.update(id, {
      status: dto.status,
      price: dto.price,
      count: dto.count,
      user: { id: userId },
    });
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOneBy({ id: +id });

    if (!find) {
      throw new NotFoundException('Заказ не найден');
    }

    if (find.user.id !== userId) {
      throw new ForbiddenException('Нет доступа к этому заказу');
    }

    return this.repository.delete(id);
  }
}
