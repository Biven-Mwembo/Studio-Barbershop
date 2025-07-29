import styles from './BookingModal.module.css';

export default function BookingModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{service.title}</h2>

        {service.img && (
          <img
            src={service.img}
            alt={service.title}
            className={styles.serviceImage}
          />
        )}
  <h4>{service.price}</h4>
        {/* Optional: description */}
        {service.description && (
          <p className={styles.description}>{service.description}</p>
        )}

        <div className={styles.buttonGroup}>
          <a
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
          >
            Book Now
          </a>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
