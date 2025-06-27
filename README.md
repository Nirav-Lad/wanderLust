# WanderLust

WanderLust is a full-stack web application for sharing and discovering unique travel lodging experiences around the world. Inspired by platforms like Airbnb, WanderLust allows users to list, browse, review, and book accommodations in various locations.

## Features

- **User Authentication:** Secure signup, login, and session management using Passport.js and sessions backed by MongoDB.
- **Listings:** Users can create, update, and delete property listings, each with details like title, description, location, country, price, and photos.
- **Reviews:** Registered users can leave reviews and ratings on listings.
- **Image Uploads:** Images are uploaded and stored via Cloudinary.
- **Map Integration:** Listings display a map using Mapbox GL JS for geolocation.
- **Validation & Error Handling:** Robust server-side validation with Joi and custom error handling.
- **Flash Messages:** User feedback via connect-flash for success and error notifications.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Passport.js (Local Strategy)
- **Frontend:** EJS templating, Bootstrap, Mapbox GL JS
- **Image Uploads:** Cloudinary, multer-storage-cloudinary
- **Validation:** Joi
- **Session Storage:** connect-mongo

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nirav-Lad/wanderLust.git
   cd wanderLust
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file with the following variables:
   ```
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAPBOX_TOKEN=your_mapbox_token
   ```

4. **Run the application:**
   ```bash
   node app.js
   ```
   The app will run on `http://localhost:8080` by default.

> For more details, browse the code and features on [GitHub](https://github.com/Nirav-Lad/wanderLust).
