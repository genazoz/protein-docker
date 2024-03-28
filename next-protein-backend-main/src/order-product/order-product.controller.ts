import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderProductDto } from './dto/create-order-product.dto';

@Controller('order-products')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderProductDto: CreateOrderProductDto) {
    return this.orderProductService.create(createOrderProductDto);
  }

  @Get('/findByOrder/:id')
  find(@Param('id') id: string) {
    return this.orderProductService.findByOrderId(+id);
  }
}
