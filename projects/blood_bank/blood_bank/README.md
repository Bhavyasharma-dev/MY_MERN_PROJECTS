 BloodBank

 Overview
BloodBank is a web application designed to manage blood donations efficiently. It facilitates user registration, tracks donations, and maintains an inventory of available blood units.

 Features
- User registration and authentication
- Donation management
- Inventory tracking
- Admin panel for managing users and overseeing donations

 Tech Stack
- Frontend: React.js, Redux
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

 Installation

 Clone the Repository
git clone https://github.com/Bhavyasharma-dev/MY_MERN_PROJECTS.git
cd MY_MERN_PROJECTS/BloodBank

 Install Dependencies
- Backend:
cd backend
npm install
- Frontend:
cd ../frontend
npm install

 Set Up Environment Variables
Create a .env file in the backend directory with the following content:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

 Run the Application
- Start the backend server:
cd backend
npm start
- Start the frontend development server:
cd ../frontend
npm start

 Usage
- Register an account
- Log in to access the dashboard
- Manage blood donations
- Admin users can access the admin panel

 API Endpoints
| Method | Endpoint | Description |

| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | User login |
| GET | /api/donors | Fetch all donors |
| POST | /api/blood-request | Create a new blood request |
| GET | /api/inventory | Get blood stock details |

 Future Enhancements
- Email/SMS notifications for urgent requests
- AI-based blood compatibility matching
- Mobile app integration

 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

 License
This project is licensed under the MIT License.

Developed by Bhavyasharma-dev
