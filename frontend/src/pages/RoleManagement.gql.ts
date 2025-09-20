import { gql } from '@apollo/client';

export const UPDATE_ROLE_MUTATION = gql`
  mutation UpdateUserRole($userId: Int!, $role: String!) {
    updateUserRole(userId: $userId, role: $role) {
      id
      username
      role
    }
  }
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      username
      role
    }
  }
`;
