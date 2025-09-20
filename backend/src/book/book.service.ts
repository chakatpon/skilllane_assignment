import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  get repository() {
    return this.bookRepository;
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findById(id: number): Promise<Book | undefined> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async createBook(data: Partial<Book>): Promise<Book> {
    const book = this.bookRepository.create(data);
    return this.bookRepository.save(book);
  }

  async updateBook(id: number, data: Partial<Book>): Promise<Book> {
    await this.bookRepository.update(id, data);
    return this.findById(id);
  }

  async searchBooks(query: string): Promise<Book[]> {
    return this.bookRepository.find({
      where: [
        { title: query },
        { author: query },
      ],
    });
  }
}
