import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPLOAD_MUTATION = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const UploadCover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { data, loading, error }] = useMutation(UPLOAD_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    await uploadFile({ variables: { file } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Book Cover</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button type="submit" disabled={loading || !file}>Upload</button>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && <p>Upload successful! URL: {data.uploadFile}</p>}
    </form>
  );
};
