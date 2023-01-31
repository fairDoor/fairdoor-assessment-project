const admin = require("firebase-admin");
const firebaseId = require("./firebaseProjectId.json");

const serviceAccount = require("./dbPermission.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount[firebaseId]),
    databaseURL: process.env.REACT_APP_DATABASE_URL,
  });
}

module.exports = { admin };
