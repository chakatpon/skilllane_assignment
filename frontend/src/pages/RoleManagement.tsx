import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { USERS_QUERY, UPDATE_ROLE_MUTATION } from './RoleManagement.gql';

export const RoleManagement: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(USERS_QUERY);
  const [updateUserRole] = useMutation(UPDATE_ROLE_MUTATION);

  const handleRoleChange = async (id: number, role: string) => {
    await updateUserRole({ variables: { userId: id, role } });
    refetch();
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>User Role Management</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <select value={user.role} onChange={e => handleRoleChange(user.id, e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="librarian">Librarian</option>
                  <option value="member">Member</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
