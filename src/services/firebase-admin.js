const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { servicesFirebaseAdmin, databaseURL, storageBucket } = require('./decodeServices');

admin.initializeApp({
    credential: admin.credential.cert(servicesFirebaseAdmin),
    databaseURL,
    storageBucket,
});

const database = getFirestore();
const storage = getStorage();

module.exports = {
    database,     
    admin,
    storage,
    storageBucket
    }