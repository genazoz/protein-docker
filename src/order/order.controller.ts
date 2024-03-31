import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SearchOrderDto } from './dto/search-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorators';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() userId: number, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @User() userId: number,
    @Param('id') id: string,
    @Body() updatePostDto: UpdateOrderDto,
  ) {
    return this.orderService.update(+id, updatePostDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getByUser(@User() userId: number) {
    return this.orderService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@User() userId: number, @Param('id') id: string) {
    return this.orderService.remove(+id, userId);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/popular')
  getPopularPosts() {
    return this.orderService.popular();
  }

  @Get('/search')
  searchPosts(@Query() dto: SearchOrderDto) {
    return this.orderService.search(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
