# File Compressor & Image Modifier

A full-stack application for compressing, modifying, and managing images. Built with a microservices architecture using Node.js (TypeScript) for the backend and React (Vite + TailwindCSS) for the frontend.

## Features
- User authentication and management
- Image upload, compression, and extraction
- Background change and image editing
- Email notifications (password reset, etc.)
- Microservices: file, user, and gateway services
- Modern, responsive frontend UI

## Folder Structure
```
backend/
  file_service/      # Handles file upload, compression, and processing
  user_service/      # User authentication, registration, and email
  gateway/           # API gateway for routing requests
frontend/            # React frontend (Vite, TailwindCSS)
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Backend Setup
1. Install dependencies for each service:
   ```sh
   cd backend/file_service && npm install
   cd ../user_service && npm install
   cd ../gateway && npm install
   ```
2. Configure environment variables for each service (see `.env.example` or documentation in each service).
3. Start all backend services (in separate terminals):
   ```sh
   # In each service directory
   npm run dev
   ```

### Frontend Setup
1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Start the frontend:
   ```sh
   npm run dev
   ```
3. Visit `http://localhost:5173` in your browser.

## Usage
- Register or log in as a user.
- Upload images to compress or modify.
- Use background change and extraction features.
- Download or manage your processed images.

## Technologies Used
- **Backend:** Node.js, Express, TypeScript, MongoDB, RabbitMQ
- **Frontend:** React, Vite, TailwindCSS
- **Other:** Multer, Cloudinary, Nodemailer

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Backend Architecture

The backend is organized as microservices, each following a modular structure:

- **Controllers:** Handle HTTP requests, validate input, and call service methods. Example: `file.controllers.ts`, `user.controllers.ts`.
- **Services:** Contain business logic, interact with databases, and external APIs. Example: `rabbit.ts` for message queue, file/user logic in respective services.
- **Routes:** Define API endpoints and map them to controllers. Example: `file.routes.ts`, `user.route.ts`.
- **Middleware:** Handle authentication, file uploads (Multer), error handling, etc.
- **Models:** Define data schemas for MongoDB (using Mongoose).
- **Utils:** Utility functions for API responses, error handling, async wrappers, etc.

### Example Structure (File Service)
```
file_service/
  src/
    controllers/
      file.controllers.ts   # File-related request handlers
    routes/
      file.routes.ts        # File API endpoints
    services/
      rabbit.ts             # RabbitMQ integration
    models/
      file.models.ts        # File schema
    middleware/
      multer.ts             # File upload config
    utils/                  # Helpers (ApiError, ApiResponse, etc.)
```

### API Endpoints (Sample)
- `POST /api/files/upload` – Upload and compress an image
- `GET /api/files/:id` – Get file metadata or download
- `POST /api/users/register` – Register a new user
- `POST /api/users/login` – User login
- `POST /api/files/background-change` – Change image background

Each endpoint is handled by a controller, which calls the appropriate service for business logic and data access.
