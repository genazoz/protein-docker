import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  imageUrl: string;

  category: number;

  @IsNotEmpty()
  prodId: number;

  @IsNotEmpty()
  orderId: number;
}
