import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getFunctions, httpsCallable } from 'firebase/functions'; 
import styles from './HeroBanner.module.css';
import BookingModal from '../Components/BookingModal';

function HeroBanner() {
  const imageRef = useRef();
  const servicesRef = useRef();
  const [showServices, setShowServices] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false); 
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Contact form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneCode, setPhoneCode] = useState('+27');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const onScroll = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShowServices(true),
      { threshold: 0.2 }
    );
    if (servicesRef.current) obs.observe(servicesRef.current);
    return () => obs.disconnect();
  }, []);

  const collageImages = [
    "./images/st2.jpg",
    "./images/st3.jpg",
    "./images/st4.jpg",
    "./images/st6.jpg",
    "./images/st7.jpg",
    "./images/st8.jpg",
    "./images/st9.jpg",
  ];

  const logos = [
    '/images/payments.png',
    '/images/pay1.png',
    '/images/apple_pay.png'
  ];

  const services = [
    { name: 'Fade Haircuts', price: 'R150', img: '/images/st9.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A14094433&share=true&pId=791020' }, 
    { name: 'Haircut + Black Dye', price: 'R180', img: '/images/st2.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A14177088&share=true&pId=791020' },
    { name: 'Haircut + Bleach (Short Hair)', price: 'From R200', img: '/images/st5.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A12745866&share=true&pId=791020' },
    { name: 'Women Haircuts', price: 'From R200', img: '/images/st12.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A11859991&share=true&pId=791020' },
    { name: 'Student Only', price: 'R120', img: '/images/st6.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A12631446&share=true&pId=791020' },
    { name: 'Indian/ Pakistan Hair', price: 'From R250', img: '/images/st14.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A20738050&share=true&pId=791020' },
    { name: 'Kids Haircuts', price: 'R80', img: '/images/st4.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A11860032&share=true&pId=791020' },
    { name: 'Shaves (ChisKop)', price: 'R80', img: '/images/st11.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A11860015&share=true&pId=791020' },
    { name: 'Scisor Cut', price: 'R250', img: '/images/st3.jpg', link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&eid=2148098&oiid=sv%3A11860009&share=true&pId=791020' },
  ];

  const handleSelect = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    setBookingError('');
    setBookingLoading(false);
  };

  const handleSubmitBookingFromModal = async (formData) => {
    setBookingError('');
    setBookingLoading(true);

    if (!formData.name || !formData.phone || !formData.email || !formData.date || !formData.time) {
      setBookingError('Please fill all fields.');
      setBookingLoading(false);
      return;
    }

    try {
      const funcs = getFunctions();
      const createBooking = httpsCallable(funcs, 'createBooking');

      await createBooking({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: selectedService.name,
        date: formData.date,
        time: formData.time,
      });

      setIsModalOpen(false);
      setIsConfirmModal(true);
      setBookingLoading(false);
    } catch (err) {
      console.error('Cloud Function Booking Error:', err);
      let errorMessage = 'Failed to submit booking. Please try again later.';
      if (err.code === 'permission-denied') {
        errorMessage = 'Booking denied. Please check your permissions or try again.';
      } else if (err.message) {
        errorMessage = `Submission failed: ${err.message}`;
      }
      setBookingError(errorMessage);
      setBookingLoading(false);
    }
  };

  const confirmDone = () => {
    setIsConfirmModal(false);
    setSelectedService(null);
    setBookingError('');
    setBookingLoading(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = `*New Message From Website*\n\n*Name:* ${fullName}\n*Email:* ${email}\n*Phone:* ${phoneCode} ${phone}\n*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/27725970077?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');

    // Reset form fields
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.contentContainer}>
          <p className={styles.heroTitle}>High-Quality Men's<br />Haircuts</p>
          <p className={styles.heroDescription}>
            Welcome to The Studio Barbershop, that "Best Barber near me".<br />
            For the people who Value their Time and Money!
          </p>
          <div className={styles.ctaSection}>
            <a href='https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&share=true&pId=791020' className={styles.contactButton}>Book Now!</a>
            <div className={styles.reviewInfo}>
              <span className={styles.trustpilot}>Google</span>
              <span className={styles.reviewStars}>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </span>
              <span>4.9</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Logo Carousel Section */}
      <p className={styles.collageDescription}>
        Our Accepted payment methods
      </p>
      <section className={styles.logoBandSection}>
        <div className={styles.logoBand}>
          {logos.map((src, i) => (
            <div key={i} className={styles.logoItem}>
              <img src={src} alt={`Logo ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Collage Section */}
      <section className={styles.collageSectionContainer}>
        <div className={styles.collageContentWrapper}>
          <h2 className={styles.collageHeading}>Our Latest Styles</h2>
          <p className={styles.collageDescription}>
            Explore our collection of modern and classic haircuts, showcasing the skill and artistry of our barbers.
          </p>
          <div className={styles.collageGrid}>
            {collageImages.map((img, i) => (
              <div key={i} className={`${styles.gridItem} ${styles['item' + (i + 1)]}`}>
                <img src={img} alt={`Img${i + 1}`} />
              </div>
            ))}
          </div>
          <a
            href="https://www.instagram.com/the_studio_barbershop?igsh=MXJyeDV5NmpzMzRrZw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewGalleryButton}
          >
            View More
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className={`${styles.servicesSection} ${showServices ? styles.reveal : ''}`}>
        <div className={styles.servicesContainer}>
          <p className={styles.subheading}>REVEAL YOUR INNER BEAUTY</p>
          <h2 className={styles.heading}>SERVICES</h2>
          <div className={styles.contentWrapper}>
            <div className={styles.imageWrapper}>
              <img ref={imageRef} src="./images/st2.jpg" alt="Side profile haircut" />
            </div>
            <div className={styles.textWrapper}>
              <div className={styles.servicesList}>
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    className={`${styles.serviceRow} ${selectedService?.name === service.name ? styles.selected : ''}`}
                    onClick={() => handleSelect(service)}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span className={styles.serviceName}>{service.name}</span>
                    <span className={styles.servicePrice}>{service.price}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <div className={styles.contactLeft}>
            <h2 className={styles.heading}>Get in Touch</h2>
            <h2 className={styles.contactHeading}>How can we help?</h2>
            <p className={styles.contactDescription}>
              We're here to assist you every step of the way. Whether you have questions, feedback, or are interested in collaborating, don't hesitate to reach out.
            </p>

            <div className={styles.contactDetails}>
              <p><strong>Cell:</strong> +27 72 597 0077</p>
              <p><strong>Email:</strong> thestudiobarbeshop@gmail.com</p>
              <p><strong>Address:</strong> 319 Main road, Observatory, Cape Town, 7925</p>
            </div>
          </div>

          <div className={styles.contactRight}>
            <form className={styles.contactForm} onSubmit={handleContactSubmit}>
              <input 
                type="text" 
                placeholder="Full Name *" 
                required 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
              <input 
                type="email" 
                placeholder="Email *" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <div className={styles.phoneWrapper}>
                <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
                  <option value="+1">+1</option>
                  <option value="+27">+27</option>
                  <option value="+44">+44</option>
                </select>
                <input 
                  type="tel" 
                  placeholder="Phone *" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>
              <textarea 
                placeholder="Enter your message" 
                rows={4} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
              />
              <button type="submit" className={styles.sendButton}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className={styles.modalOverlay} initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300 }}>
            <BookingModal
              service={selectedService}
              onClose={() => setIsModalOpen(false)}
              onSubmitBooking={handleSubmitBookingFromModal}
              loading={bookingLoading}
              error={bookingError}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmModal && (
          <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modalContent}>
              <h3>Booking Confirmed</h3>
              <p>A confirmation email has been sent!</p>
              <button onClick={confirmDone} className={styles.modalBtn}>Done</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeroBanner;
