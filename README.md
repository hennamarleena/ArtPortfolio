# Portfolio

This is a personal project designed to showcase my collage artwork through online portfolio.

## Key features

- Lightbox Gallery: Browse and view images in full-screen mode with smooth navigation using a lightbox
- Filter artworks by category 
- Contact form: Send messages directly via an integrated contact form powered by Web3Forms

## How it works
- Frontend (Netlify): The React app fetches image data from the Express API using Axios and renders the images in a responsive grid layout. The lightbox feature allows for a detailed view of each collage.
- Backend (Render): The Express server serves both the image files and metadata from Render
- Hosting: The app is hosted on Netlify for frontend deployment, while the images and backend API are served from Render

## Technologies used

- **React** - JavaScript library for building user interfaces
- **Yet Another React Lightbox** - customizable Lightbox component for viewing images, 
  [GitHub Repository](https://github.com/igordanchenko/yet-another-react-lightbox)
- **Material UI** - Component library
- **Zustand** - State management library for handling application state
- **React-router** - For handling client-side routing
- **Axios** - For making API requests from the client side
- **Web3Forms** - For handling contact form submissions
- **Node.js & Express** - Backend server to manage API requests and serve images and their metadata (the server is Deployed on Render)
- **Netlify** - The frontend application is hosted on Netlify