import * as React from 'react';
import { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Card, CardContent, Typography, TextField, Button, Avatar, Box } from '@mui/material';

const SEARCH_BOOKS_QUERY = gql`
  query SearchBooks($query: String!) {
    searchBooks(query: $query) {
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

export const SearchBooks: React.FC = () => {
  const [search, setSearch] = useState('');
  const [searchBooks, { data, loading, error }] = useLazyQuery(SEARCH_BOOKS_QUERY);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchBooks({ variables: { query: search } });
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 500, mx: 'auto', mb: 4, boxShadow: 2 }}>
        <CardContent>
          <form onSubmit={handleSearch}>
            <TextField
              label="Search by title or author"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>Search</Button>
          </form>
        </CardContent>
      </Card>
      {loading && <Typography align="center">Searching...</Typography>}
      {error && <Typography color="error" align="center">Error: {error.message}</Typography>}
      {data && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
          {data.searchBooks.map((book: any) => (
            <div key={book.id} style={{ flex: '1 0 300px', maxWidth: 340, margin: 12 }}>
              <Card sx={{ minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                <Avatar src={book.coverImage} alt={book.title} sx={{ width: 64, height: 64, mb: 2 }} />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="body2" color="text.secondary">by {book.author} ({book.publicationYear})</Typography>
                  <Typography variant="body2">ISBN: {book.isbn}</Typography>
                  <Typography variant="body2" color={book.quantity > 0 ? 'primary' : 'error'}>Available: {book.quantity}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};
