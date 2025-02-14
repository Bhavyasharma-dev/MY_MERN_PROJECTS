 Blogify

 Introduction

 Blogify is a modern, full-featured blog application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to create, edit, and share blog posts with a fully responsive interface. The application provides authentication, comment functionality, and a seamless user experience.

 Features

- User authentication with JWT
- Create, edit, and delete blog posts
- Comment system for user engagement
- User profiles with author details
- Image uploads for blog cover images
- Categories and tags for content organization
- Fully responsive design

 Tech Stack

 Frontend

- React.js
- Redux 
- Tailwind CSS for styling


 Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for image uploads

 Installation & Setup

 Prerequisites

- Node.js 
- MongoDB installed locally or MongoDB Atlas

 Clone the Repository

bash
git clone https://github.com/Bhavyasharma-dev/MY_MERN_PROJECTS.git
cd MY_MERN_PROJECTS/blogify


 Backend Setup

1. Navigate to the server directory:
   
   cd server
   
2. Install dependencies:
   
   npm install
   
3. Create a .env file and configure it:

   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_secret_key(dont wont to name here)
   
4. Start the backend server:
   
   npm start
   

 Frontend Setup

1. Navigate to the client directory:
   
   cd ../client
   
2. Install dependencies:
   bash
   npm install
   ```
3. Start the frontend:
   bash
   npm start
   

 Running the App

Once both frontend and backend are running, open `http://localhost:3000` in your browser.

API Endpoints[ just giving this for example i might update this later]

 Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Authenticate user
- GET /api/auth/me - Get current user details

 Blog Management

- GET /api/blogs - Fetch all blogs
- POST /api/blogs - Create a new blog
- GET /api/blogs/:id - Get a specific blog
- PUT /api/blogs/:id - Update a blog
- DELETE /api/blogs/:id - Delete a blog

 Comments

- POST /api/blogs/:id/comments - Add a comment
- GET /api/blogs/:id/comments - Get all comments

 Future Improvements

- Social media authentication with Google and Facebook
- Recommendation system for personalized content
- Enhanced SEO optimization for better reach
- Deployment on AWS or Heroku with CI/CD integration

 Contributing

Contributions are welcome. Follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added feature"`)
4. Push to branch (`git push origin feature-name`)
5. Open a pull request

 License

This project is licensed under the MIT License.

 Contact

For any questions, feel free to reach out:

- GitHub: [Bhavyasharma-dev](https://github.com/Bhavyasharma-dev)

