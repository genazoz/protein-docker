import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order-products')
export class OrderProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  category: number;

  @Column()
  prodId: number;

  @Column()
  orderId: number;
}
