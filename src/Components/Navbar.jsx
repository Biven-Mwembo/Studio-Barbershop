import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo + Company Name */}
        <div className={styles.logo}>
          <img src="/images/sb_logo1.png" alt="Logo" className={styles.logoImage} />
          <div className={styles.companyName}>
            <h2 className={styles.Title}>
              THE STUDIO <span className={styles.subtitle}>BARBERSHOP</span>
            </h2>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            <li><button onClick={() => handleNavigation('/')} className={styles.navButton}>Home</button></li>
            <li><button onClick={() => handleNavigation('/about')} className={styles.navButton}>About us</button></li>
            <li><button onClick={() => handleNavigation('/services')} className={styles.navButton}>Services</button></li>
            <li><button onClick={() => handleNavigation('/contact')} className={styles.navButton}>Contact</button></li>
          </ul>
        </nav>

        {/* Book Now + Hamburger */}
        <div className={styles.rightSection}>
          <a
          href='https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&share=true&pId=791020'
            className={styles.bookNowButton}
            onClick={() => handleNavigation('https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&share=true&pId=791020')}
          >
            Book Now
          </a>

          <button
            className={styles.hamburgerMenu}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            &#9776;
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <button
            className={styles.closeMenuButton}
            onClick={() => setIsMenuOpen(false)}
          >
            &times;
          </button>
          <nav>
            <ul className={styles.mobileNavList}>
              <li><button onClick={() => handleNavigation('/')} className={styles.mobileNavButton}>Home</button></li>
              <li><button onClick={() => handleNavigation('/about')} className={styles.mobileNavButton}>About us</button></li>
              <li><button onClick={() => handleNavigation('/services')} className={styles.mobileNavButton}>Services</button></li>
              <li><button onClick={() => handleNavigation('/contact')} className={styles.mobileNavButton}>Contact</button></li>
              <li><button onClick={() => handleNavigation('https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&share=true&pId=791020')} className={styles.mobileNavButton}>Book Now</button></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
