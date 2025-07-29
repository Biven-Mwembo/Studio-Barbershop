import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.css';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.ctaSection}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
         <div className={styles.logo}>
              <img src="/images/sb_logo1.png" alt="Logo" className={styles.logoImage} />
            </div>
        <h2>Book An Appointment Today</h2>
        <p>
          Book an appointment with our skilled and expert Barbers whenever or wherever you want!
        </p>
        <a href=
        "https://www.fresha.com/a/the-studio-barbershop-cape-town-319-main-road-td4hhks2/booking?pId=791020&cartId=9a9d0d2a-69cc-43a9-9cc9-97903c079211"
         target="_blank" className={styles.ctaButton}>Book Appointment</a>
      </motion.div>

      <motion.div
        className={styles.footerGrid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div>
          <h4>Contact</h4>
          <p><FaPhoneAlt /> +27 72–597–0077</p>
          <p><FaMapMarkerAlt /> 319 Main road, Observatory, <br/>Cape Town 7835</p>
          <p><FaEnvelope /> thestudiobarbeshop@gmail.com</p>
        </div>



     

     
<div className={styles.socialIcons}>
  <h4>Follow Us</h4>
  <div className={styles.iconRow}>
    <a href="https://www.facebook.com/share/14Hbc47qKCR/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
        <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.878v-6.99h-2.54v-2.888h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.127 22 17 22 12z"/>
      </svg>
    </a>

    <a href="https://www.instagram.com/the_studio_barbershop?igsh=MXJyeDV5NmpzMzRrZw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z"/>
      </svg>
    </a>


   <a href="https://www.tiktok.com/@the_studio_barbeshop?_t=ZM-8yPlzs1wZHS&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className={styles.icon}>
    <path d="M232,80.2a71.87,71.87,0,0,1-43.2-14.4A71.47,71.47,0,0,1,160,30a8,8,0,0,0-8-8H120a8,8,0,0,0-8,8V168a24,24,0,1,1-24-24,8,8,0,0,0,0-16,40,40,0,1,0,40,40V94.63a88.51,88.51,0,0,0,48,13.57,8,8,0,0,0,8-8V88.2A88.15,88.15,0,0,0,232,80.2Z"/>
  </svg>
</a>

  </div>
</div>

      </motion.div>

      <div className={styles.bottomBar}>
        <p>©Copyright THE STUDIO BARBERSHOP All rights reserved. 2025</p>
        <div>
          <span>Privacy & Policy</span> | <span>Terms & Condition</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
