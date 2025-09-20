import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Card, CardContent, Typography, TextField, Button, Alert, Box } from '@mui/material';

const ADD_BOOK_MUTATION = gql`
  mutation AddBook($title: String!, $author: String!, $isbn: String!, $publicationYear: Int!, $coverImage: String, $quantity: Int) {
    addBook(title: $title, author: $author, isbn: $isbn, publicationYear: $publicationYear, coverImage: $coverImage, quantity: $quantity) {
      id
      title
    }
  }
`;

export const AddBook: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: '',
    coverImage: '',
    quantity: 1,
  });
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook({ variables: {
      ...form,
      publicationYear: parseInt(form.publicationYear, 10),
      quantity: parseInt(form.quantity as any, 10),
    }});
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>Add New Book</Typography>
          <form onSubmit={handleSubmit}>
            <TextField label="Title" name="title" variant="outlined" fullWidth margin="normal" value={form.title} onChange={handleChange} required />
            <TextField label="Author" name="author" variant="outlined" fullWidth margin="normal" value={form.author} onChange={handleChange} required />
            <TextField label="ISBN" name="isbn" variant="outlined" fullWidth margin="normal" value={form.isbn} onChange={handleChange} required />
            <TextField label="Publication Year" name="publicationYear" type="number" variant="outlined" fullWidth margin="normal" value={form.publicationYear} onChange={handleChange} required />
            <TextField label="Cover Image URL" name="coverImage" variant="outlined" fullWidth margin="normal" value={form.coverImage} onChange={handleChange} />
            <TextField label="Quantity" name="quantity" type="number" variant="outlined" fullWidth margin="normal" value={form.quantity} onChange={handleChange} required />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>Add Book</Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>}
            {data && <Alert severity="success" sx={{ mt: 2 }}>Book added!</Alert>}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
