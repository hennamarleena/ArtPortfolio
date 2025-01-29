# Portfolio

This is a personal project designed to showcase my collage artwork through online portfolio.

## Key features

- Lightbox Gallery: Browse and view images in full-screen mode with smooth navigation
- Filter artworks by category 
- Contact form: Send messages directly via an integrated contact form powered by Web3Forms

## How it works
- **Frontend (Netlify)**: The React app fetches image data and displays images in a responsive grid layout. The lightbox allows a detailed view of each collage.
- **Backend (Render)**: The Express server serves image files and metadata (name, category) via an API.

## Technologies used

- **React.js**
- **Yet Another React Lightbox** - Customizable Lightbox component for viewing images, 
  [GitHub Repository](https://github.com/igordanchenko/yet-another-react-lightbox)
- **Material UI** - Component library
- **Zustand** - State management library
- **React-router** - For client-side routing
- **Axios** - For making API requests
- **Web3Forms** - For handling contact form submissions
- **Node.js & Express** - Backend server managing image files and metadata (hosted on Render)
- **Netlify** - Hosting the frontend application