// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar';
import HeroBanner from './Components/HeroBanner';
import Footer from './Components/Footer';

import AboutUs from './Pages/AboutUs';
import Services from './Pages/Services';
import BookingModal from './Components/BookingModal';


import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HeroBanner />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<BookingModal />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
