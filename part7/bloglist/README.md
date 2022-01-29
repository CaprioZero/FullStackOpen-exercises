# Monorepo bloglist application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for the frontend and `express` for the backend.

# To run full FE and BE

In the project root, run command:

`npm run dev` to start development server or `npm run start` to start production server

Open [http://localhost:3003/api/blogs](http://localhost:3003/api/blogs) to view all blogs in the browser.
Open [http://localhost:3003/api/users](http://localhost:3003/api/users) to view all users in the browser.

Run command `cd client` and then `npm start` to run React frontend in the 'client' folder

# Sample account:

admin/admin123

# Note:

As of January 2022, mongoose-unique-validator@3.0.0 contain false error "User validation failed: _id: Error, expected `_id` to be unique"
View [this](https://github.com/FullStack-HY/part3-notes-backend/issues/7) and [this](https://github.com/blakehaswell/mongoose-unique-validator/issues/131)
Revert back to 2.0.3 for temporary fix with this command `npm install mongoose-unique-validator@2.0.3 --legacy-peer-deps`