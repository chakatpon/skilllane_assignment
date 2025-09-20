import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Card, CardContent, Typography, Avatar, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
const BORROW_BOOK_MUTATION = gql`
  mutation BorrowBook($bookId: Int!) {
    borrowBook(bookId: $bookId) {
      id
      quantity
    }
  }
`;
const RETURN_BOOK_MUTATION = gql`
  mutation ReturnBook($bookId: Int!) {
    returnBook(bookId: $bookId) {
      id
      quantity
    }
  }
`;

const BOOKS_QUERY = gql`
  query Books {
    books {
      id
      title
      author
      isbn
      publicationYear
      coverImage
      quantity
    }
  }
`;

export const BookList: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(BOOKS_QUERY);
  const [borrowBook] = useMutation(BORROW_BOOK_MUTATION);
  const [returnBook] = useMutation(RETURN_BOOK_MUTATION);
  const { token } = useAuth();
  // Decode userId from JWT (simple base64 decode, adjust if JWT structure changes)
  let userId = 0;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.sub;
    } catch {}
  }

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography color="error" align="center">Error: {error.message}</Typography>;

  const handleBorrow = async (bookId: number) => {
    await borrowBook({ variables: { userId, bookId } });
    refetch();
  };
  // For return, you need borrowId; this will be handled in borrow history page/component
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>Book Library</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
        {data.books.map((book: any) => (
          <div key={book.id} style={{ flex: '1 0 300px', maxWidth: 340, margin: 12 }}>
            <Card sx={{ minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
              <Avatar src={book.coverImage} alt={book.title} sx={{ width: 64, height: 64, mb: 2 }} />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">by {book.author} ({book.publicationYear})</Typography>
                <Typography variant="body2">ISBN: {book.isbn}</Typography>
                <Typography variant="body2" color={book.quantity > 0 ? 'primary' : 'error'}>Available: {book.quantity}</Typography>
                <Button component={Link} to={`/edit/${book.id}`} variant="outlined" size="small" sx={{ mt: 1 }}>
                  Edit
                </Button>
                <Button onClick={() => handleBorrow(book.id)} variant="contained" color="primary" size="small" sx={{ mt: 1, ml: 1 }} disabled={book.quantity <= 0}>
                  Borrow
                </Button>
                {/* Remove direct return button here; will be handled in borrow history */}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </Box>
  );
};
