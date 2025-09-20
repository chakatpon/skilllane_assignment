import * as React from 'react';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Card, CardContent, Typography, TextField, Button, Alert, Box } from '@mui/material';

const BORROW_MUTATION = gql`
  mutation BorrowBook($userId: Int!, $bookId: Int!) {
    borrowBook(userId: $userId, bookId: $bookId) {
      id
      returned
      borrowedAt
    }
  }
`;

const RETURN_MUTATION = gql`
  mutation ReturnBook($borrowId: Int!) {
    returnBook(borrowId: $borrowId) {
      id
      returned
      returnedAt
    }
  }
`;

export const BorrowReturn: React.FC = () => {
  const [userId, setUserId] = useState<number>(0);
  const [bookId, setBookId] = useState<number>(0);
  const [borrowId, setBorrowId] = useState<number>(0);
  const [borrowBook, { data: borrowData, loading: borrowLoading, error: borrowError }] = useMutation(BORROW_MUTATION);
  const [returnBook, { data: returnData, loading: returnLoading, error: returnError }] = useMutation(RETURN_MUTATION);

  const handleBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    borrowBook({ variables: { userId, bookId } });
  };

  const handleReturn = (e: React.FormEvent) => {
    e.preventDefault();
    returnBook({ variables: { borrowId } });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
      <div style={{ flex: '1 0 340px', maxWidth: 400, margin: 12 }}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>Borrow Book</Typography>
            <form onSubmit={handleBorrow}>
              <TextField
                label="User ID"
                type="number"
                fullWidth
                value={userId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(Number(e.target.value))}
                required
              />
              <TextField
                label="Book ID"
                type="number"
                fullWidth
                value={bookId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookId(Number(e.target.value))}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={borrowLoading} sx={{ mt: 2 }}>
                Borrow
              </Button>
              {borrowError && <Alert severity="error" sx={{ mt: 2 }}>{String(borrowError.message)}</Alert>}
              {borrowData && <Alert severity="success" sx={{ mt: 2 }}>Borrowed!</Alert>}
            </form>
          </CardContent>
        </Card>
      </div>
      <div style={{ flex: '1 0 340px', maxWidth: 400, margin: 12 }}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>Return Book</Typography>
            <form onSubmit={handleReturn}>
              <TextField
                label="Borrow ID"
                type="number"
                fullWidth
                value={borrowId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBorrowId(Number(e.target.value))}
                required
              />
              <Button type="submit" variant="contained" color="secondary" fullWidth disabled={returnLoading} sx={{ mt: 2 }}>
                Return
              </Button>
              {returnError && <Alert severity="error" sx={{ mt: 2 }}>{String(returnError.message)}</Alert>}
              {returnData && <Alert severity="success" sx={{ mt: 2 }}>Returned!</Alert>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
