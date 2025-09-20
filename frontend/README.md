
# Book Library Management Web Application

## User Stories (Core)
- Authenticate before accessing the application
- Add a new book (title, author, ISBN, year, cover image)
- View all books
- Search books by title or author
- View book details
- Update book details
- Borrow a book (reduce quantity)
- Return a book (increase quantity)
- View borrowing history and return books

## Features
- User authentication (JWT, RBAC)
- Book CRUD (add, edit, delete, view)
- Book search (by title/author)
- Borrow/return books with quantity management
- Borrowing history and most borrowed books analytics
- Role management (admin, librarian, member)
- File upload for book covers
- Redis caching for search
- API documentation (Swagger at `/api`)
- Unit, integration, and E2E tests
- Docker & CI/CD setup

## Setup & Usage

### Local Development
1. Install Docker and Docker Compose.
2. Run: `docker-compose -f docker/docker-compose.yml up --build`
	- This will build all services and automatically run migrations to reset all data, seed the default admin user, and generate 20 mock books and 20 borrow records for demo/testing.
3. Backend: http://localhost:3000
4. Frontend: http://localhost:8080
5. Swagger API docs: http://localhost:3000/api

### Default Admin User
- Username: `admin`
- Password: `password` (update in migration if needed)

### Book Management
- Add, edit, and delete books from the UI.
- Upload cover images via the 'Upload Cover' page. Uploaded images are stored in `/uploads` and accessible via `/uploads/{filename}`.

### Borrow/Return
- Borrow books from the list or details page. Quantity is updated automatically.
- View and manage your borrowing history from the 'Borrow History' page.

### User Registration
- Register new users via the frontend registration form or GraphQL mutation.

### Testing
- Backend: `npm run test` in `/backend`
- Frontend: `npm test` in `/frontend`

### CI/CD
- GitHub Actions workflow in `/ci/github-actions.yml`

## Folder Structure
- `/frontend`: React + TypeScript app
- `/backend`: NestJS + TypeScript GraphQL API
- `/db`: PostgreSQL setup scripts
- `/docker`: Dockerfiles and config
- `/ci`: CI/CD workflows
- `/uploads`: Uploaded book cover images

## Advanced Features
- RBAC and role management via admin UI
- File upload for book covers
- Redis caching for search
- Most borrowed books analytics

---

For more details, see code comments and Swagger docs.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
