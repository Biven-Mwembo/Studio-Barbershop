import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import BookingModal from '../Components/BookingModal'; // Make sure path is correct
import styles from './Services.module.css';


  const services = [
    { title: 'Fade Haircuts', price: 'R150', img: '/images/st9.jpg',link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A14094433&share=true&pId=791020' }, 
    { title: 'Haircut + Black Dye', price: 'R180', img: '/images/st2.jpg',link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A14177088&share=true&pId=791020' },
    { title: 'Haircut + Bleach (Short Hair)', price: 'From R200', img: '/images/st5.jpg',link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A12745866&share=true&pId=791020' },
    { title: 'Women Haircuts', price: 'From R200', img: '/images/st12.jpg' ,link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A11859991&share=true&pId=791020'},
    { title: 'Student Only', price: 'R120', img: '/images/st6.jpg',link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A12631446&share=true&pId=791020 '},
    { title: 'Indian/ Pakistan Hair', price: 'From R250', img: '/images/st14.jpg',link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A20738050&share=true&pId=791020' },
    { title: 'Kids Haircuts', price: 'R80', img: '/images/st4.jpg' ,link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A11860032&share=true&pId=791020'},
    { title: 'Shaves (ChisKop)', price: 'R80', img: '/images/st11.jpg' ,link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&oiid=sv%3A11860015&share=true&pId=791020'},
    { title: 'Scisor Cut', price: 'R250', img: '/images/st3.jpg' ,link: 'https://www.fresha.com/book-now/the-studio-barbershop-v77k81gt/services?lid=841430&eid=2148098&oiid=sv%3A11860009&share=true&pId=791020'},
  ];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className={styles.servicesSection}>
      <h2 className={styles.title}>Our Services</h2>

      <div className={styles.grid}>
        {services.map((service, i) => (
          <div
            key={i}
            onClick={() => setSelectedService(service)}
            className={styles.card}
          >
            <img src={service.img} alt={service.title} className={styles.icon} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardPrice}>{service.price}</p>
              <div className={styles.bookIcon}>
                <BookOpen size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
