
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Book } from '../book/book.entity';


@ObjectType()
@Entity()
export class Borrow {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.borrows)
  user: User;

  @Field(() => Book)
  @ManyToOne(() => Book, book => book.borrows)
  book: Book;

  @Field()
  @Column({ default: false })
  returned: boolean;

  @Field()
  @CreateDateColumn()
  borrowedAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  returnedAt: Date;
}
