import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  status: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  count: number;
}
