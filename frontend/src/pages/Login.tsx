import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { Card, CardContent, Typography, TextField, Button, Alert, Box } from '@mui/material';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const { login: doLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ variables: { username, password } });
    if (result.data?.login) {
      doLogin(result.data.login);
      navigate('/');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
              Login
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>}
            {data && <Alert severity="success" sx={{ mt: 2 }}>Login successful!</Alert>}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
