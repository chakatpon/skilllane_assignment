import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

export const BookDetails: React.FC<{ id: number }> = ({ id }) => {
  const { data, loading, error } = useQuery(BOOK_QUERY, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.book) return <p>Book not found.</p>;

  const book = data.book;
  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.coverImage} alt={book.title} width={100} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Year:</strong> {book.publicationYear}</p>
      <p><strong>Available:</strong> {book.quantity}</p>
    </div>
  );
};
