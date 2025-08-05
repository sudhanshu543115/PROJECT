# Medical Keeper - Advanced Healthcare Management System

A comprehensive healthcare management application with user authentication, medical record management, and AI-powered health insights.

## Features

- 🔐 **Secure Authentication**: JWT-based login and signup system
- 📊 **Health Dashboard**: Real-time health metrics and analytics
- 🤖 **AI Health Assistant**: Intelligent health interviews and recommendations
- 💳 **Billing System**: Automated payment tracking and insurance management
- 📱 **Responsive Design**: Modern UI with Tailwind CSS
- 🔒 **Security**: Password hashing, rate limiting, and input validation

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **HTML5** - Structure
- **Tailwind CSS** - Styling
- **JavaScript** - Interactivity
- **Three.js** - 3D animations
- **Chart.js** - Data visualization
- **GSAP** - Animations

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical-keeper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the `config.env` file and update it with your configuration:
   ```bash
   cp config.env .env
   ```
   
   Update the following variables in your `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/medical_keeper
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=24h
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - API Health Check: http://localhost:3000/api/health

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| PUT | `/api/auth/change-password` | Change password | Private |
| POST | `/api/auth/logout` | Logout user | Private |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health status |

## Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  dateOfBirth: Date,
  phoneNumber: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  },
  medicalProfile: {
    bloodType: String,
    allergies: Array,
    medications: Array,
    conditions: Array
  },
  role: String (patient/doctor/admin),
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

## Usage

### Registration
1. Click "Create Account" on the login page
2. Fill in all required fields:
   - First Name
   - Last Name
   - Email
   - Password (min 6 characters)
   - Date of Birth
   - Phone Number
3. Click "Create Account"

### Login
1. Enter your email and password
2. Click "Sign in"
3. You'll be redirected to the dashboard

### Dashboard Features
- **Health Summary**: View your overall health score and vital signs
- **Activity Tracker**: Monitor daily steps and physical activity
- **Medical History**: Access your medical records and lab results
- **AI Assistant**: Get health recommendations and symptom analysis
- **Billing**: Manage payments and insurance claims

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation for all user inputs
- **Rate Limiting**: Protection against brute force attacks
- **CORS Protection**: Cross-origin request protection
- **Helmet Security**: Additional security headers

## Development

### Project Structure
```
medical-keeper/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── validate.js         # Input validation
├── models/
│   └── User.js             # User model
├── routes/
│   └── auth.js             # Authentication routes
├── index.html              # Frontend application
├── server.js               # Express server
├── package.json            # Dependencies
├── config.env              # Environment variables
└── README.md              # Documentation
```

### Adding New Features

1. **Create a new model** in `models/`
2. **Add controller functions** in `controllers/`
3. **Create routes** in `routes/`
4. **Add validation** in `middleware/validate.js`
5. **Update the frontend** in `index.html`

## Deployment

### Production Setup

1. **Environment Variables**
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medical_keeper
   JWT_SECRET=your-production-secret-key
   ```

2. **MongoDB Atlas** (Recommended for production)
   - Create a MongoDB Atlas account
   - Set up a cluster
   - Get your connection string
   - Update `MONGODB_URI` in your environment variables

3. **Deploy to your preferred platform**
   - Heroku
   - Vercel
   - AWS
   - DigitalOcean

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@medicalkeeper.com or create an issue in the repository.

## Acknowledgments

- Tailwind CSS for the beautiful UI components
- Three.js for the 3D animations
- Chart.js for data visualization
- MongoDB for the database solution 