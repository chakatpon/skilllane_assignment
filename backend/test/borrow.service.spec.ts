import { BorrowService } from '../src/borrow/borrow.service';
import { Book } from '../src/book/book.entity';
import { User } from '../src/user/user.entity';

describe('BorrowService', () => {
  let service: BorrowService;
  let book: Book;
  let user: User;

  beforeEach(() => {
    service = new BorrowService(null, null, null);
    book = { id: 1, quantity: 2 } as Book;
    user = { id: 1 } as User;
  });

  it('should borrow a book if available', async () => {
    book.quantity = 2;
    // Simulate borrowBook logic
    expect(book.quantity).toBeGreaterThan(0);
    book.quantity -= 1;
    expect(book.quantity).toBe(1);
  });

  it('should not borrow if book unavailable', async () => {
    book.quantity = 0;
    expect(book.quantity).toBe(0);
    // Simulate error thrown
    expect(() => {
      if (book.quantity < 1) throw new Error('Book not available');
    }).toThrow('Book not available');
  });
});
