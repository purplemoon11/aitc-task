Social Media Platform for Events Documentation

- Requirements

  Operating System: Windows, macOS, Linux
  Browser: Chrome, Firefox, Safari, Edge
  Other Prerequisites: Node.js, PostgreSQL

- Configuration

  Configure the application by editing the .env.example file located in the root directory:

  DATABASE_URL: PostgreSQL connection string
  JWT_SECRET: Secret key for JWT authentication
  DEV_SWAGGER: Provide url to load swagger (localhost:5000/docs)

- Project Setup & Launch

  npm install: To initialize the project  
  npm run dev: To run the server

- Features

  - Auth
    Description: Allows users to authenticate.

  - Create Event
    Description: Allows users to create new events.

  - Follow Users
    Description: Follow other users to see their events.

- Glossary
  JWT: JSON Web Token, used for secure authentication.
  CRUD: Create, Read, Update, Delete, basic operations for managing data.
