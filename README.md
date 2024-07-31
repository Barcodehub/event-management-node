# Communities App

Communities App is a backend application developed with Node.js and MongoDB that enables the creation and management of communities/groups, similar to a social network. Users can join communities, create events, and manage the privacy of their groups.

## Features

- User authentication (registration and login)
- CRUD operations for communities
- Community privacy management (public or private)
- Request system for joining private communities
- CRUD operations for events within communities
- RESTful API

# Set up environment variables:
- Create a `.env` file in the root directory
- Add the following variables:
  ```
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/chatapp
  JWT_SECRET=your_jwt_secret
  ```
- Adjust the values according to your setup

The server will start at `http://localhost:5000/` (or the port you specified in the `.env` file).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/getCurrentUser` - Info user logged

### Communities

- `POST /api/communities` - Create a new community
- `GET /api/communities/public` - Get all public communities
- `POST /api/communities/join/:id` - Join a community
- `POST /api/communities/approve/:id/:userId` - Approve join request (creator only)

### Events

- `POST /api/events/:communityId` - Create a new event in a community
- `GET /api/events/:communityId` - Get all events of a community

## Testing

You can test the API using tools like Postman. Make sure to include the JWT token in the `x-auth-token` header for protected routes.
