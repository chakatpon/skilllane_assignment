import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './borrow.entity';
import { BorrowService } from './borrow.service';
import { BorrowResolver } from './borrow.resolver';
import { BookModule } from '../book/book.module';
import { UserModule } from '../user/user.module';


import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Book, User]), BookModule, UserModule],
  providers: [BorrowService, BorrowResolver],
  exports: [BorrowService],
})
export class BorrowModule {}
