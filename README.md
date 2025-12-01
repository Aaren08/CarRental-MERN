# CarRental (MERN)

Comprehensive documentation for the CarRental MERN sample project.

## Overview

This repository contains a full-stack car rental application built with the MERN stack (MongoDB, Express, React, Node). The backend (Express + MongoDB) exposes REST endpoints used by the React frontend. The app includes basic authentication, owner and user controllers, car and booking models, image upload integration, and a small UI built with Vite + React.

## Tech stack

- Backend: Node.js, Express, Mongoose
- Frontend: React, Vite
- Database: MongoDB
- Image handling: ImageKit (integration present in `backend/configs/imageKit.js`)

## Repo layout (top-level)

- `backend/` — Express API server
  - `server.js` — backend entry point
  - `configs/` — configuration (db, imageKit)
  - `controllers/` — route handlers (bookingController, ownerController, userController)
  - `middleware/` — middleware (auth, multer)
  - `models/` — Mongoose models (bookingModel, carModel, userModel)
  - `routes/` — API routes
- `frontend/` — React app (Vite)
  - `src/` — react source, components, pages, context
  - `public/` — static files

## Illustration

1. The backend provides standard scripts like `npm run start` and (optionally) `npm run dev` (e.g. with nodemon). If your `backend/package.json` differs, follow the scripts defined there.
2. The frontend is a Vite app and uses `npm run dev` for development.

## Environment variables (recommended)

Create a `.env` file in the `backend/` folder. Example variables the app expects or commonly needs:

```
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
JWT_SECRET=<your-jwt-secret>
IMAGEKIT_PUBLIC_KEY=<imagekit-public>
IMAGEKIT_PRIVATE_KEY=<imagekit-private>
IMAGEKIT_URL_ENDPOINT=<imagekit-url-endpoint>
```

Also, create a `.env` file in the `frontend/` folder.

```
VITE_CURRENCY=<your-preferred-currency>
VITE_BASE_URL=<your-base-url>
```

Replace the names above with the exact names used in your code if they differ. The backend `configs/` folder contains database and imagekit helpers — check those files to confirm exact variable names.

## Setup & Run (development)

Run the backend and frontend in separate terminals.

Backend (Windows PowerShell):

```powershell
cd backend
npm install
# create .env (see example above)
```

## API Reference

This section documents the backend API endpoints currently implemented in `backend/`.

General notes

- Base route prefixes (see `backend/server.js`):
  - `/api/user` — user-related endpoints
  - `/api/owner` — owner-related endpoints
  - `/api/bookings` — booking-related endpoints
- Protected endpoints require an Authorization header with a Bearer token issued during login/registration:

  Authorization: Bearer <token>

User endpoints

- POST /api/user/register

  - Description: Register a new user.
  - Body (application/json): { name, email, password }
  - Validation: password must be at least 8 characters.
  - Response: { success, message, token, user: { id, name, email } }

- POST /api/user/login

  - Description: Login and receive a JWT token.
  - Body (application/json): { email, password }
  - Response: { success, message, token, user: { id, name, email } }

- GET /api/user/data

  - Description: Get the current users data (protected).
  - Headers: Authorization: Bearer <token>
  - Response: { success, user }

- GET /api/user/cars
  - Description: Get all cars (used by the frontend to list available cars).
  - Response: { success, cars } (each car populated with owner)

Owner endpoints (protected)

- POST /api/owner/change-role

  - Description: Promote authenticated user to owner role so they can list cars.
  - Headers: Authorization: Bearer <token>
  - Response: { success, message, user }

- POST /api/owner/add-car

  - Description: List a new car. Expects multipart/form-data with an image file.
  - Headers: Authorization: Bearer <token>
  - Content (multipart/form-data):
    - `carData` (string) — JSON string of car fields (e.g., title, pricePerDay, location, etc.)
    - `image` (file) — image file for the car
  - Response: { success, message }

- GET /api/owner/cars

  - Description: Get cars belonging to the authenticated owner.
  - Headers: Authorization: Bearer <token>
  - Response: { success, cars }

- POST /api/owner/toggle-car

  - Description: Toggle availability of a car owned by the authenticated user.
  - Headers: Authorization: Bearer <token>
  - Body (application/json): { carId }
  - Response: { success, message }

- POST /api/owner/delete-car

  - Description: Delete a car owned by the authenticated user.
  - Headers: Authorization: Bearer <token>
  - Body (application/json): { carId }
  - Response: { success, message }

- GET /api/owner/dashboard

  - Description: Get dashboard data (totalCars, totalBookings, pendingBookings, completedBookings, recentBookings, monthlyRevenue).
  - Headers: Authorization: Bearer <token> (user must have role `owner`)
  - Response: { success, dashboardData }

- POST /api/owner/update-image
  - Description: Update the authenticated users profile image.
  - Headers: Authorization: Bearer <token>
  - Content (multipart/form-data): `image` (file)
  - Response: { success, message }

Booking endpoints

- POST /api/bookings/check-availability

  - Description: Find available cars for a given location and date range.
  - Body (application/json): { location, pickupDate, returnDate }
  - Response: { success, availableCars }

- POST /api/bookings/create

  - Description: Create a booking for a car (protected).
  - Headers: Authorization: Bearer <token>
  - Body (application/json): { car, pickupDate, returnDate }
    - `car` should be the car \_id
  - Response: { success, message, booking }

- GET /api/bookings/user

  - Description: Get bookings for the authenticated user.
  - Headers: Authorization: Bearer <token>
  - Response: { success, bookings }

- GET /api/bookings/owner

  - Description: Get bookings for the authenticated owner (bookings where owner === user).
  - Headers: Authorization: Bearer <token>
  - Response: { success, bookings }

- POST /api/bookings/change-status
  - Description: Owner can change the status of a booking (e.g., pending -> confirmed).
  - Headers: Authorization: Bearer <token>
  - Body (application/json): { bookingId, status }
  - Response: { success, message }

Authentication and headers

- For protected routes include the header:
  Authorization: Bearer <JWT token>

Common response shape

- Most endpoints return a JSON object like:
  { success: boolean, message?: string, <dataKey>: ... }

Notes and assumptions

- The exact request field names for car data (when listing a car) are based on how `carData` is parsed in `ownerController.listCar` — `carData` must be sent as a JSON string in a `multipart/form-data` request together with the `image` file.
- Where endpoints require ownership checks (toggle/delete car, change booking status), the controllers enforce authorization and will return `400` with an `Unauthorized` message when checks fail.

The CarRental-MERN project is a web application that allows users to rent cars. It is built using the MERN (MongoDB, Express, React, Node.js) stack.

### Main Function Points

- Allows users to browse and rent cars
- Provides a user-friendly interface for managing car rentals
- Includes a backend API for handling car rental data

### Technology Stack

- MongoDB: A NoSQL database for storing car rental data
- Express.js: A web application framework for Node.js, used for building the backend API
- React.js: A JavaScript library for building the user interface
- Node.js: A JavaScript runtime environment for running the backend server

### License

The project does not specify a license, so the default copyright applies.
