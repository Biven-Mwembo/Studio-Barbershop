import React, { useState, useEffect, useRef } from 'react';
import styles from './landing.module.css'; // Import the CSS module

// LandingPage Component
function LandingPage({ setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

  // Define the background image URL using the contentFetchId
  const backgroundImageURL = `https://content-fetcher.web.app/fetch/${encodeURIComponent('uploaded:image_b1b929.png-302359f0-3bf2-4a55-b12f-e4a93554f1d0')}`;

  // Function to close the menu and navigate
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Close menu after navigation
  };

  // Parallax effect for the background image
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        // Adjust the parallax speed as needed
        heroRef.current.style.backgroundPositionY = `${-scrollY * 0.3}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo/Brand */}
          <div className={styles.logo}>
            <h1 className={styles.logoMain}>COURAGE</h1>
            <p className={styles.logoSub}>Federal Barbershop Network</p>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              <li><button onClick={() => handleNavigation('about')} className={styles.navButton}>ABOUT US</button></li>
              <li><button onClick={() => handleNavigation('services')} className={styles.navButton}>SERVICES</button></li>
              <li><button onClick={() => handleNavigation('abilities')} className={styles.navButton}>ABILITIES</button></li>
            </ul>
          </nav>

          {/* Right Section (Login/Menu Icon) */}
          <div className={styles.rightSection}>
            <button className={styles.loginButton}>LOG IN</button>
            {/* Hamburger menu for mobile */}
            <button
              className={styles.hamburgerMenu}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <button
            className={styles.closeMenuButton}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <nav>
            <ul className={styles.mobileNavList}>
              <li><button onClick={() => handleNavigation('about')} className={styles.mobileNavButton}>ABOUT US</button></li>
              <li><button onClick={() => handleNavigation('services')} className={styles.mobileNavButton}>SERVICES</button></li>
              <li><button onClick={() => handleNavigation('abilities')} className={styles.mobileNavButton}>ABILITIES</button></li>
              <li><button onClick={() => handleNavigation('login')} className={styles.mobileNavButton}>LOG IN</button></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <div
        ref={heroRef}
        className={styles.heroSection}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('${backgroundImageURL}')`,
        }}
      >
        <div className={styles.heroContent}>
          {/* Main Heading and Sub-heading */}
          <div className={styles.heroTextGroup}>
            <h2 className={styles.mainHeading}>HIGH-QUALITY MEN'S HAIRCUTS</h2>
            <p className={styles.subHeading}>FOR THOSE WHO VALUE THEIR TIME AND MONEY</p>
          </div>

          {/* Button */}
          <div className={styles.buttonContainer}>
            <button
              onClick={() => handleNavigation('book')}
              className={styles.bookAppointmentButton}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
