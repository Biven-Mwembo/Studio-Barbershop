import React from 'react';
import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h1 className={styles.heading}>About Us</h1>
        <p className={styles.intro}>
          At <strong>The Studio Barbershop</strong>, we don’t just cut hair — we craft confidence.
          Founded on precision, passion, and a commitment to style, our barbershop is a space where tradition meets modern grooming.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Our Mission</h2>
            <p>
              To deliver high-quality grooming experiences in a welcoming, creative environment where every client leaves feeling their best.
            </p>
          </div>
      <div className={styles.wrapper}>
        <div className={styles.label}>CHOOSE US</div>
        <h2 className={styles.title}>Why Choose Us</h2>
        <p className={styles.subtitle}>
          Our expert barbers specialize in classic, modern, and custom cuts for all hair types and textures. Whether it’s a timeless style or the latest trend, we’ll ensure you...
        </p>

        <div className={styles.contentGrid}>
          <div className={styles.imageWrapper}>
            <div className={styles.cornerTop}></div>
            <div className={styles.cornerBottom}></div>
            <img  src="/images/st6.jpg" alt="Barber cutting hair" />
          </div>

          <div className={styles.textBlock}>
            <h3>Comfortable and Relaxing Environment</h3>
            <p>
              We believe that grooming is more than just a service—it’s an experience. Here’s why our clients trust us:
            </p>
            <ul className={styles.list}>
              <li>🟧 Great conversation and feeling refreshed.</li>
              <li>🟧 Enjoy comfortable atmosphere.</li>
              <li>🟧 Your health and safety are our top priority.</li>
              <li>🟧 We provide luxury and quality services.</li>
            </ul>
          </div>
        </div>
      </div>

        </div>
      </div>
    </section>
  );
}

export default AboutUs;
