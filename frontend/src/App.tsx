
import React from 'react';
import './App.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { client } from './api/graphql';
import { Login } from './pages/Login';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { BookList } from './pages/BookList';
import { useParams } from 'react-router-dom';
import { EditBook } from './pages/EditBook';
import { AddBook } from './pages/AddBook';
import { SearchBooks } from './pages/SearchBooks';
import { BorrowReturn } from './pages/BorrowReturn';
import { BorrowHistory } from './pages/BorrowHistory';
import { UploadCover } from './pages/UploadCover';
import { BookDetails } from './pages/BookDetails';
import { RoleBasedRoute, Role } from './components/RoleBasedRoute';
import { RoleManagement } from './pages/RoleManagement';

// Wrapper to extract id from route params
const EditBookWrapper: React.FC = () => {
  const { id } = useParams();
  return <EditBook id={parseInt(id || '0', 10)} />;
};

// Example: get user role from localStorage or context
const userRole: Role = (localStorage.getItem('role') as Role) || 'member';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f6f8',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.2rem' },
    h2: { fontWeight: 600, fontSize: '1.5rem' },
  },
});

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  if (!token) {
    window.location.replace('/login');
    return null;
  }
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <AuthProvider>
          <Router>
            <div style={{ maxWidth: 700, margin: '40px auto', padding: 32, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
              <h1 style={{ textAlign: 'center', marginBottom: 32, color: theme.palette.primary.main }}>Book Library Management</h1>
              <nav style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32 }}>
                <Link style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 500 }} to="/">Home</Link>
                <Link style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 500 }} to="/login">Login</Link>
                <Link style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 500 }} to="/search">Search</Link>
                <Link style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 500 }} to="/add">Add Book</Link>
                <Link style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 500 }} to="/history">Borrow History</Link>
                <Link style={{ textDecoration: 'none', color: theme.palette.primary.main, fontWeight: 500 }} to="/upload">Upload Cover</Link>
                {userRole === 'admin' && <Link style={{ textDecoration: 'none', color: theme.palette.secondary.main, fontWeight: 500 }} to="/roles">Role Management</Link>}
              </nav>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute><BookList /></PrivateRoute>} />
                <Route path="/add" element={<PrivateRoute><AddBook /></PrivateRoute>} />
                <Route path="/search" element={<PrivateRoute><SearchBooks /></PrivateRoute>} />
                <Route path="/borrow" element={<PrivateRoute><BorrowReturn /></PrivateRoute>} />
                <Route path="/history" element={<PrivateRoute><BorrowHistory /></PrivateRoute>} />
                <Route path="/upload" element={<PrivateRoute><UploadCover /></PrivateRoute>} />
                <Route path="/book/:id" element={<PrivateRoute><BookDetails id={0} /></PrivateRoute>} />
                <Route path="/edit/:id" element={<PrivateRoute><EditBookWrapper /></PrivateRoute>} />
                <Route path="/roles" element={<PrivateRoute><RoleManagement /></PrivateRoute>} />
                <Route path="*" element={<div style={{textAlign:'center',marginTop:64}}><h2>404 - Page Not Found</h2><p>The page you requested does not exist.</p></div>} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
