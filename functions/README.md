# A minimal recruiter app

## Set up your environment

### `dbPermission.json`

You can find this file that I shared with you on dashlane. It enables the Firebase admin SDK to connect to Firestore and Firebase Auth.

### `npm install`

This will install public packages.

### Run `firebase login`

I've added you as a member of fairdoor-v0 (staging) Firebase project, you can login with your email adress.

### Run `firebase project:list`

The fairdoor-v0 should be listed and selected.

### Run `firebase deploy --only functions:<NAME OF YOUR FUNCTION>`

Once you've created a cloud function, you can deploy it on staging.
Logs can be viewed [here](https://console.cloud.google.com/logs/query?project=fairdoor-v0)

## Stripe

**Nothing to do!** Only being logged to Firebase (see firebase login step)

N.B: Fairdoor Stripe test account is linked to Fairdoor staging DB. When a candidates signs up on Fairdoor staging candidte platform, a connected account on Fairdoor Stripe test account is created. You will be able to emulate the whole payment process as Stripe test environment emulate everything (connected account creation, payment etc)
