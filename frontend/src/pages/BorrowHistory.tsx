import React, { useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useAuth } from '../components/AuthProvider';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const BORROW_HISTORY_QUERY = gql`
  query BorrowingHistory($userId: Int!) {
    borrowingHistory(userId: $userId) {
      id
      book {
        id
        title
        author
        coverImage
      }
      returned
      borrowedAt
      returnedAt
    }
  }
`;

const RETURN_BOOK_MUTATION = gql`
  mutation ReturnBook($borrowId: Int!) {
    returnBook(borrowId: $borrowId) {
      id
      returned
      returnedAt
    }
  }
`;

export const BorrowHistory: React.FC = () => {
  const { token } = useAuth();
  let userId = 0;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.sub;
    } catch {}
  }
  const { data, loading, error, refetch } = useQuery(BORROW_HISTORY_QUERY, { variables: { userId } });
  const [returnBook] = useMutation(RETURN_BOOK_MUTATION);

  const handleReturn = async (borrowId: number) => {
    await returnBook({ variables: { borrowId } });
    refetch();
  };

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography color="error" align="center">Error: {error.message}</Typography>;

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>Borrowing History</Typography>
      {data?.borrowingHistory.map((borrow: any) => (
        <Card key={borrow.id} sx={{ maxWidth: 500, mx: 'auto', mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{borrow.book.title}</Typography>
            <Typography variant="body2">by {borrow.book.author}</Typography>
            <Typography variant="body2">Borrowed: {new Date(borrow.borrowedAt).toLocaleDateString()}</Typography>
            {borrow.returned ? (
              <Typography variant="body2" color="primary">Returned: {new Date(borrow.returnedAt).toLocaleDateString()}</Typography>
            ) : (
              <Button onClick={() => handleReturn(borrow.id)} variant="contained" color="secondary" size="small">Return</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
