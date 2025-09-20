import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BorrowService } from './borrow.service';
import { Borrow } from './borrow.entity';
import { Book } from '../book/book.entity';

@Resolver(() => Borrow)
export class BorrowResolver {
  constructor(private readonly borrowService: BorrowService) {}

  @Mutation(() => Borrow)
  async borrowBook(
    @Args('userId') userId: number,
    @Args('bookId') bookId: number,
  ): Promise<Borrow> {
    return this.borrowService.borrowBook(userId, bookId);
  }

  @Mutation(() => Borrow)
  async returnBook(
    @Args('borrowId') borrowId: number,
  ): Promise<Borrow> {
    return this.borrowService.returnBook(borrowId);
  }

  @Query(() => [Borrow])
  async borrowingHistory(@Args('userId') userId: number): Promise<Borrow[]> {
    return this.borrowService.borrowingHistory(userId);
  }

  @Query(() => [Book])
  async mostBorrowedBooks(): Promise<Book[]> {
    return this.borrowService.mostBorrowedBooks();
  }
}
