import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductEntity } from './entities/order-product.entity';
import { CreateOrderProductDto } from './dto/create-order-product.dto';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProductEntity)
    private repository: Repository<OrderProductEntity>,
  ) {}

  create(dto: CreateOrderProductDto) {
    return this.repository.save({
      title: dto.title,
      price: dto.price,
      imageUrl: dto.imageUrl,
      category: dto.category,
      prodId: dto.prodId,
      orderId: dto.orderId,
    });
  }

  findByOrderId(id: number) {
    return this.repository.findBy({ orderId: id });
  }
}
