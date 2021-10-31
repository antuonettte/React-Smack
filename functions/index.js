const functions = require("firebase-functions");
const Filter = require("bad-words");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
    .document('Groups/{groupName}/Messages/{msgId}')
    .onCreate(async (doc, ctx) => {
        const filter = new Filter();
        const {body, userId, name} = doc.data();

        if(filter.isProfane(body)){
            const cleaned = filter.clean(body);
            await doc.ref.update({body: `I got BANNED for life for saying bad words`});

            await db.collection('Banned').doc(userId).set({
                name: name
            });
        }

    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
