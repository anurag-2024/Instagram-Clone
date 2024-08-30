# Instagram Web Clone

## Overview
Built a web version of Instagram to replicate core functionalities using React, Node.js, Express.js, MongoDB, and Sass. This project aims to provide a social media experience with features similar to Instagram, including user authentication, photo uploads, and stories.

## Features
- **Stories & Photo Uploads**: Users can upload photos and share stories, emulating Instagram's core features.
- **Secure Authentication**: Implemented a secure login system to protect user information and ensure privacy.
- **Efficient Data Handling**: Developed a robust backend for managing user data and interactions efficiently.
- **Modular Styling**: Used Sass for modular and maintainable styling, improving the design and responsiveness of the application.

## Tech Stack
- **Frontend**: React, Sass
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

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
   ```

5. **Start the Application**:
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
- **Sign up or log in** to start using the platform.
- **Upload photos, view stories**, and interact with other users.

