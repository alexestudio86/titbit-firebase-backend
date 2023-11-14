require('dotenv').config();
const admin = require("firebase-admin/app");
const {getFirestore} = require('firebase-admin/firestore');


admin.initializeApp({
    credential: admin.applicationDefault(),
    projectId: 'comandas-3a9bd',
    databaseURL: 'https://comandas-3a9bd.firebaseio.com'
});

const db = getFirestore();

module.exports = {
    db
}