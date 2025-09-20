import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private readonly borrowRepository: Repository<Borrow>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async borrowBook(userId: number, bookId: number): Promise<Borrow> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book || book.quantity < 1) throw new Error('Book not available');
    book.quantity -= 1;
    await this.bookRepository.save(book);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const borrow = this.borrowRepository.create({ user, book, returned: false });
    return this.borrowRepository.save(borrow);
  }

  async returnBook(borrowId: number): Promise<Borrow> {
    const borrow = await this.borrowRepository.findOne({ where: { id: borrowId }, relations: ['book'] });
    if (!borrow || borrow.returned) throw new Error('Invalid borrow record');
    borrow.returned = true;
    borrow.returnedAt = new Date();
    await this.borrowRepository.save(borrow);
    borrow.book.quantity += 1;
    await this.bookRepository.save(borrow.book);
    return borrow;
  }

  async borrowingHistory(userId: number): Promise<Borrow[]> {
    return this.borrowRepository.find({ where: { user: { id: userId } }, relations: ['book'] });
  }

  async mostBorrowedBooks(): Promise<Book[]> {
    // Simplified: return books ordered by borrow count
    const borrows = await this.borrowRepository.find({ relations: ['book'] });
    const countMap = borrows.reduce((acc, b) => {
      acc[b.book.id] = (acc[b.book.id] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    const books = await this.bookRepository.find();
    return books.sort((a, b) => (countMap[b.id] || 0) - (countMap[a.id] || 0));
  }
}
