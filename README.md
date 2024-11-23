# Instagram Web Clone

## Overview
Built a web version of Instagram to replicate core functionalities using React, Node.js, Express.js, MongoDB, and Sass. This project aims to provide a social media experience with features similar to Instagram, including user authentication and photo uploads.

## Live Demo
🚀 Try it out: [Instagram Clone Demo](https://instagram-clone-ashen-ten.vercel.app/)

Test Credentials:
- Email: test@gmail.com
- Password: test@123

## Features
- **Photo Uploads**: Users can upload and share photos with the community
- **Secure Authentication**: Implemented a secure login system to protect user information and ensure privacy
- **Efficient Data Handling**: Developed a robust backend for managing user data and interactions efficiently
- **Modular Styling**: Used Sass for modular and maintainable styling, improving the design and responsiveness of the application

## Tech Stack
- **Frontend**: React, Sass
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Cloud Storage**: Cloudinary

## Setup & Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/instagram-web-clone.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd instagram-web-clone
   ```

3. **Install Dependencies**:
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../client
     npm install
     ```

4. **Configure Environment Variables**:
   Create a `.env` file in the `server` directory with the following content:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   FOLDER_NAME=your_folder_name
   
   # Email Configuration (Optional)
   REACT_APP_EMAIL=your_email
   REACT_APP_PASSWORD=your_app_password
   ```

5. **Cloud Services Setup**:
   - Create a [Cloudinary](https://cloudinary.com/) account for image storage

6. **Start the Application**:
   - Run the backend server:
     ```bash
     cd server
     npm start
     ```
   - Run the frontend development server:
     ```bash
     cd ../client
     npm start
     ```

## Usage
- **Sign up or log in** to start using the platform
- **Upload photos** and share them with the community
- **Engage with others** through likes and comments

