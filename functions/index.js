// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore and other Firebase services.
const admin = require('firebase-admin');
admin.initializeApp(); // Initialize Firebase Admin SDK

// EmailJS for Node.js
const emailjs = require('@emailjs/nodejs');

// Get a reference to the Firestore database
const db = admin.firestore();

/**
 * Cloud Function to handle booking submissions.
 * It saves the booking to Firestore and sends a confirmation email via EmailJS.
 *
 * This function is called from the client-side using `httpsCallable`.
 */
exports.createBooking = functions.https.onCall(async (data, context) => {
  // Extract data from the client request
  const { name, phone, email, service, date, time } = data;

  // --- Input Validation ---
  if (!name || !phone || !email || !service || !date || !time) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required booking details. Please provide name, phone, email, service, date, and time.'
    );
  }

  // Optional: Add authentication check if you have user login in your app
  // if (!context.auth) {
  //   throw new functions.https.HttpsError(
  //     'unauthenticated',
  //     'You must be logged in to make a booking.'
  //   );
  // }

  try {
    // 1. Save booking to Firestore
    // Combine date and time strings into a single Date object for better storage
    // Example: "2025-07-25T14:30"
    const bookingDateTime = new Date(`${date}T${time}`);

    await db.collection('bookings').add({
      serviceName: service,
      customerName: name, // Using customerName for clarity
      customerPhone: phone,
      customerEmail: email,
      bookingDateTime: bookingDateTime, // Stored as Firestore Timestamp
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Timestamp of creation
      status: 'pending' // Initial status
    });

    // 2. Send booking email via EmailJS (server-side)
    // Retrieve sensitive keys from Firebase Functions environment configuration
    // Make sure you have set these using 'firebase functions:config:set' command
    const EMAILJS_SERVICE_ID = functions.config().emailjs.service_id;
    const EMAILJS_TEMPLATE_ID = functions.config().emailjs.template_id;
    const EMAILJS_PUBLIC_KEY = functions.config().emailjs.public_key;   // Your EmailJS User ID
    const EMAILJS_PRIVATE_KEY = functions.config().emailjs.private_key; // Your EmailJS Private Key

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
        throw new functions.https.HttpsError(
            'internal',
            'EmailJS API keys are not configured correctly in Firebase Functions environment variables.'
        );
    }

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        user_name: name,
        user_email: email,
        user_phone: phone,
        booking_date: bookingDateTime.toLocaleDateString(), // Format date for email
        booking_time: bookingDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time for email
        service_name: service,
        // Add any other data your EmailJS template expects
      },
      {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY, // Use the private key for server-side authentication
      }
    );

    console.log(`Booking successfully created for ${email} (Service: ${service})`);

    // Return a success response to the client
    return { status: 'success', message: 'Booking confirmed successfully!' };

  } catch (error) {
    // Log the full error to Cloud Functions logs for debugging
    console.error('Error in createBooking Cloud Function:', error);

    // Re-throw an HttpsError to send a more user-friendly error back to the client
    // Avoid sending raw sensitive error details back to the client
    throw new functions.https.HttpsError(
      'internal',
      'Failed to process your booking. Please try again later.',
      error.message // This will be logged to client console.error, but not shown in alert by default.
    );
  }
});