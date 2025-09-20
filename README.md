
# Book Library Management Web Application

## Features
- User authentication (JWT, RBAC)
- Book CRUD, search, borrow/return
- Role management (admin, librarian, member)
- Borrowing history, most borrowed books
- File upload for book covers
- Redis caching for search
- API documentation (Swagger at `/api`)
- Unit, integration, and E2E tests
- Docker & CI/CD setup


## Setup & Run From Scratch

### Prerequisites
- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).
- (Optional) Install Node.js (v18+) and npm if you want to run locally without Docker.

### Quick Start (Recommended)
1. Clone the repository:
	```bash
	git clone <your-repo-url>
	cd skillane
	```
2. Build and start all services:
	```bash
	docker-compose -f docker/docker-compose.yml up --build
	```
	- This will:
	  - Build backend, frontend, and database containers
	  - Run migrations to reset all data
	  - Seed default admin user, 20 mock books, and 20 borrow records
3. Access the app:
	- Backend API: [http://localhost:3000](http://localhost:3000)
	- Frontend: [http://localhost:8080](http://localhost:8080)
	- Swagger API docs: [http://localhost:3000/api](http://localhost:3000/api)

### Manual Local Development (No Docker)
1. Install dependencies:
	- Backend:
	  ```bash
	  cd backend
	  npm install
	  npm run start:dev
	  ```
	- Frontend:
	  ```bash
	  cd frontend
	  npm install
	  npm start
	  ```
2. Ensure PostgreSQL is running locally and update `.env` files as needed.
3. Run migrations manually:
	```bash
	cd backend
	npm run migration:run
	```

### Default Admin User
- Username: `admin`
- Password: `password` (update in migration if needed)

### Mock Data
- 20 books and 20 borrow records are automatically seeded for demo/testing via migration.

### Cover Image Upload
- Upload book cover images via the 'Upload Cover' page in the frontend. Images are stored in `/uploads` and accessible via `/uploads/{filename}`.

### User Registration
- Register new users via the frontend registration form or GraphQL mutation.

### Testing
- Backend: `npm run test` in `/backend`
- Frontend: `npm test` in `/frontend`

### CI/CD
- GitHub Actions workflow in `/ci/github-actions.yml`

### Troubleshooting
- If you see database connection errors, check your Docker containers and `.env` files.
- For port conflicts, update the ports in `docker-compose.yml` or `.env`.
- For migration/data issues, run migrations manually as shown above.


## Folder Structure
- `/frontend`: React + TypeScript app
- `/backend`: NestJS + TypeScript GraphQL API
- `/db`: PostgreSQL setup scripts
- `/docker`: Dockerfiles and config
- `/ci`: CI/CD workflows

## Advanced
- RBAC and role management via admin UI
- File upload for book covers
- Redis caching for search
- Most borrowed books analytics

---

For more details, see code comments and Swagger docs.
