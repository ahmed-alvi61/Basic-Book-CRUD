
# Node.js Express API

## Overview
This project is a Node.js Express API that follows the **MVC (Model-View-Controller)** architecture. This structure ensures a clean separation of concerns, where the Model handles the data and business logic, the View manages the presentation layer, and the Controller coordinates user input and updates. This architecture provides a modular, scalable, and maintainable codebase.

## Features
**Separation of Concerns**: The MVC structure divides the application into three distinct layers—Models, Views, and Controllers—ensuring that each part has a clear responsibility and promoting easier maintenance.
**Modular Code**: Business logic resides in Controllers, data interaction is managed by Models, and Views are used for the presentation layer, making the codebase easier to extend and maintain.
**Reusability**: Common logic and functionality can be reused across the application, particularly in the Controller and Model layers.
**Testability**: Each component (Model, View, Controller) can be independently tested, facilitating unit and integration testing.
**Middleware**: Includes middleware for authentication, error handling, and input validation, ensuring security and robust data handling.

## Folder Structure

```
📁 assesment
├── 📁 api
|   |
│   ├── 📁 controllers
│   │   └── userController.js     # User controller logic
|   |   └── bookController.js     # Book controller logic
|   |
│   ├── 📁 implementation
│   │   └── userImplementation.js # User-related business logic implementation
|   |   └── bookImplementation.js # Book-related business logic implementation
|   |
│   ├── 📁 routers
│   │   └── userRoutes.js         # User-related routes
|   |   └── bookRoutes.js         # Book-related routes
|   |
│   └── ─ routes.js               # General API routes
|
├── 📁 src
|   |
│   ├── 📁 middleware
│   │   └── verifyToken.js        # Token verification middleware
|   |
│   ├── 📁 models
│   │   └── userModel.js          # User model schema
|   |   └──bookModel.js           # Book model schema
|   |
│   ├── 📁 queries
│   │   └── userQueries.js        # User queries for database interaction
|   |   └── bookQueries.js        # Book queries for database interaction
|   |
│   ├── 📁 services
│   │   ├── responseService.js    # Response formatting and services
│   │   └── tokenService.js       # Token generation and validation services
|   |
│   ├── 📁 utilities
│   │   ├── constants.js          # Application constants
│   │   └── messages.js           # Application messages and error handling
|   |
│   ├── 📁 validations
│   │   └── userValidations.js    # User input validation logic
├── ─ .env                         # Environment variables
├── ─ .env.example                 # Example environment variables
├── ─ .gitignore                   # Git ignore rules
├── ─ app.js                       # Entry point of the application
├── ─ package-lock.json            # NPM package lock file
├── ─ package.json                 # NPM package configuration
└── ─ README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install the dependencies using `npm`:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and configure it with your own settings:
     ```bash
     cp .env.example .env
     ```

4. Run the application in development mode:
   ```bash
   npm start
   ```

## Usage

- **API Documentation**: Access the Postman API documentation in the folder naming `PostmanCollection.json`.
- **Authentication**: Use JWT for securing API routes. Authentication logic is handled in `Root of folder Postman Header`

## Features

### Authentication
- **Login**
- **Register**
- **JWT-based Authentication**

### Book Management
- **Add new Book**
- **Get Book**
- **Get All Book**
- **Delete Book**
- **Update Book**

### Rate Limiting
- Prevents abuse with rate limiting middleware, protecting the API from DDoS attacks.


## Testing

- **Unit Tests**: Ensure business logic is tested using appropriate testing libraries like Jest.
- **Integration Tests**: Test the interaction between different components and the database.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request
