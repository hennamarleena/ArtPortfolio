import './index.css'
import { Routes, Route, Outlet } from "react-router";
import Header from './Header'
import Footer from './Footer'
import ImageGalleryView from './views/ImageGalleryView';
import ContactView from './views/ContactView';

function App() {

  return (
    <>    
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ImageGalleryView />} />
        <Route path="home" element={<ImageGalleryView />} />
        <Route path="contact" element={<ContactView />} />
      </Route>
    </Routes>

    </>
  )
}

function Layout() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
}


export default App
