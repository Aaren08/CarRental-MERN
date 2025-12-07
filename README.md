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

### User Endpoints

#### Register a new user

```http
  POST /api/user/register
```

| Parameter  | Type     | Description                               |
| :--------- | :------- | :---------------------------------------- |
| `name`     | `string` | **Required**. User's name                 |
| `email`    | `string` | **Required**. User's email                |
| `password` | `string` | **Required**. Password (min 8 characters) |

**Response:**

```json
{
  "success": boolean,
  "message": string,
  "token": string,
  "user": {
    "id": string,
    "name": string,
    "email": string
  }
}
```

#### Login user

```http
  POST /api/user/login
```

| Parameter  | Type     | Description                   |
| :--------- | :------- | :---------------------------- |
| `email`    | `string` | **Required**. User's email    |
| `password` | `string` | **Required**. User's password |

**Response:**

```json
{
  "success": boolean,
  "message": string,
  "token": string,
  "user": {
    "id": string,
    "name": string,
    "email": string
  }
}
```

#### Get current user data

```http
  GET /api/user/data
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

**Response:**

```json
{
  "success": boolean,
  "user": object
}
```

#### Get all cars

```http
  GET /api/user/cars
```

**Response:**

```json
{
  "success": boolean,
  "cars": array
}
```

---

### Owner Endpoints (Protected)

#### Change user role to owner

```http
  POST /api/owner/change-role
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

**Response:**

```json
{
  "success": boolean,
  "message": string,
  "user": object
}
```

#### Add a new car

```http
  POST /api/owner/add-car
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

**Body (multipart/form-data):**

| Field     | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `carData` | `string` | **Required**. JSON string of car details |
| `image`   | `file`   | **Required**. Car image file             |

**Response:**

```json
{
  "success": boolean,
  "message": string
}
```

#### Get owner's cars

```http
  GET /api/owner/cars
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

**Response:**

```json
{
  "success": boolean,
  "cars": array
}
```

#### Toggle car availability

```http
  POST /api/owner/toggle-car
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `carId`   | `string` | **Required**. ID of the car |

**Response:**

```json
{
  "success": boolean,
  "message": string
}
```

#### Delete a car

```http
  POST /api/owner/delete-car
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `carId`   | `string` | **Required**. ID of the car |

**Response:**

```json
{
  "success": boolean,
  "message": string
}
```

#### Get owner dashboard data

```http
  GET /api/owner/dashboard
```

| Header          | Type     | Description                             |
| :-------------- | :------- | :-------------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token (owner role) |

**Response:**

```json
{
  "success": boolean,
  "dashboardData": {
    "totalCars": number,
    "totalBookings": number,
    "pendingBookings": number,
    "completedBookings": number,
    "recentBookings": array,
    "monthlyRevenue": number
  }
}
```

#### Update profile image

```http
  POST /api/owner/update-image
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

**Body (multipart/form-data):**

| Field   | Type   | Description                      |
| :------ | :----- | :------------------------------- |
| `image` | `file` | **Required**. Profile image file |

**Response:**

```json
{
  "success": boolean,
  "message": string
}
```

---

### Booking Endpoints

#### Check car availability

```http
  POST /api/bookings/check-availability
```

| Parameter    | Type     | Description                      |
| :----------- | :------- | :------------------------------- |
| `location`   | `string` | **Required**. Location to search |
| `pickupDate` | `string` | **Required**. Pickup date        |
| `returnDate` | `string` | **Required**. Return date        |

**Response:**

```json
{
  "success": boolean,
  "availableCars": array
}
```

#### Create a booking

```http
  POST /api/bookings/create
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter    | Type     | Description               |
| :----------- | :------- | :------------------------ |
| `car`        | `string` | **Required**. Car ID      |
| `pickupDate` | `string` | **Required**. Pickup date |
| `returnDate` | `string` | **Required**. Return date |

**Response:**

```json
{
  "success": boolean,
  "message": string,
  "booking": object
}
```

#### Get user bookings

```http
  GET /api/bookings/user
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

**Response:**

```json
{
  "success": boolean,
  "bookings": array
}
```

#### Get owner bookings

```http
  GET /api/bookings/owner
```

| Header          | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

**Response:**

```json
{
  "success": boolean,
  "bookings": array
}
```

#### Change booking status

```http
  POST /api/bookings/change-status
```

| Header          | Type     | Description                        |
| :-------------- | :------- | :--------------------------------- |
| `Authorization` | `string` | **Required**. Bearer token (owner) |

| Parameter   | Type     | Description                                |
| :---------- | :------- | :----------------------------------------- |
| `bookingId` | `string` | **Required**. Booking ID                   |
| `status`    | `string` | **Required**. New status (e.g., confirmed) |

**Response:**

```json
{
  "success": boolean,
  "message": string
}
```

### Notes and assumptions

- The exact request field names for car data (when listing a car) are based on how `carData` is parsed in `ownerController.listCar` — `carData` must be sent as a JSON string in a `multipart/form-data` request together with the `image` file.
- Where endpoints require ownership checks (toggle/delete car, change booking status), the controllers enforce authorization and will return `400` with an `Unauthorized` message when checks fail.

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
