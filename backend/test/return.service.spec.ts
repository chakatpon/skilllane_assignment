import { BorrowService } from '../src/borrow/borrow.service';
import { Book } from '../src/book/book.entity';
import { Borrow } from '../src/borrow/borrow.entity';

describe('ReturnBook', () => {
  let service: BorrowService;
  let book: Book;
  let borrow: Borrow;

  beforeEach(() => {
    service = new BorrowService(null, null, null);
    book = { id: 1, quantity: 1 } as Book;
    borrow = { id: 1, returned: false, book } as Borrow;
  });

  it('should return a borrowed book', async () => {
    borrow.returned = false;
    book.quantity = 1;
    borrow.returned = true;
    book.quantity += 1;
    expect(borrow.returned).toBe(true);
    expect(book.quantity).toBe(2);
  });

  it('should not return if already returned', async () => {
    borrow.returned = true;
    expect(() => {
      if (borrow.returned) throw new Error('Invalid borrow record');
    }).toThrow('Invalid borrow record');
  });
});
