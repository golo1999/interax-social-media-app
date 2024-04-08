const admin = require("firebase-admin");

// https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse/50376092#50376092
const firebase = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  }),
});

const firestore = firebase.firestore();

module.exports = { firebase, firestore };
