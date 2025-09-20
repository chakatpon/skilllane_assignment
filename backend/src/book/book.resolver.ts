import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(() => Book, { nullable: true })
  async book(@Args('id') id: number): Promise<Book | undefined> {
    return this.bookService.findById(id);
  }

  @Mutation(() => Book)
  async addBook(
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('isbn') isbn: string,
    @Args('publicationYear') publicationYear: number,
    @Args('coverImage', { nullable: true }) coverImage?: string,
    @Args('quantity', { nullable: true }) quantity?: number,
  ): Promise<Book> {
    return this.bookService.createBook({ title, author, isbn, publicationYear, coverImage, quantity });
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id') id: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('author', { nullable: true }) author?: string,
    @Args('isbn', { nullable: true }) isbn?: string,
    @Args('publicationYear', { nullable: true }) publicationYear?: number,
    @Args('coverImage', { nullable: true }) coverImage?: string,
    @Args('quantity', { nullable: true }) quantity?: number,
  ): Promise<Book> {
    return this.bookService.updateBook(id, { title, author, isbn, publicationYear, coverImage, quantity });
  }

  @Query(() => [Book])
  async searchBooks(@Args('query') query: string): Promise<Book[]> {
    return this.bookService.searchBooks(query);
  }
}
