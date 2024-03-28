import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findById(+id);
  }

  @Get()
  index(@Query() dto: SearchProductDto) {
    return this.productService.paginate(dto);
  }
}
