import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
const BOOK_QUERY = gql`
  query Book($id: Int!) {
    book(id: $id) {
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

const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook(
    $id: Int!
    $title: String
    $author: String
    $isbn: String
    $publicationYear: Int
    $coverImage: String
    $quantity: Int
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      isbn: $isbn
      publicationYear: $publicationYear
      coverImage: $coverImage
      quantity: $quantity
    ) {
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

export const EditBook: React.FC<{ id: number }> = ({ id }) => {
  const { data: bookData, loading: bookLoading } = useQuery(BOOK_QUERY, { variables: { id } });
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationYear: 0,
    coverImage: '',
    quantity: 1,
  });
  const [updateBook, { data, loading, error }] = useMutation(UPDATE_BOOK_MUTATION);

  useEffect(() => {
    if (bookData?.book) {
      setForm({
        title: bookData.book.title,
        author: bookData.book.author,
        isbn: bookData.book.isbn,
        publicationYear: bookData.book.publicationYear,
        coverImage: bookData.book.coverImage || '',
        quantity: bookData.book.quantity,
      });
    }
  }, [bookData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBook({ variables: { id, ...form, publicationYear: parseInt(form.publicationYear as any, 10), quantity: parseInt(form.quantity as any, 10) } });
  };

  if (bookLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} />
      <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
      <input name="publicationYear" type="number" placeholder="Year" value={form.publicationYear} onChange={handleChange} />
      <input name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
      <button type="submit" disabled={loading}>Update</button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && <p>Book updated!</p>}
    </form>
  );
};
