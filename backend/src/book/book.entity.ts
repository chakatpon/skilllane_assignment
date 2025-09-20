
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from '../borrow/borrow.entity';


@ObjectType()
@Entity()
export class Book {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column({ unique: true })
  isbn: string;

  @Field(() => Int)
  @Column()
  publicationYear: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  coverImage: string;

  @Field(() => Int)
  @Column({ default: 1 })
  quantity: number;

  @Field(() => [Borrow], { nullable: true })
  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow[];
}
