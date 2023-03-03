# A minimal recruiter app

## Set up your environment

### Dashlane 'Candidate Tech' and Firebase project

Once you're starting the development of this project, i'll add you in the "Candidate Tech Dashlane group.
You will get access to

- dbPermission.json to get access to staging Firestore
- npm auth token to download shared-code private Fairdoor package
- .runtimeConfig.json to run emulated cloud functions
- .env to run the recruiter test app
  I will also add you the staging Firebase project 'fairdoor-v0 so that you can get a view at the Database structure

### `dbPermission.json`

You can find this file that I shared with you on dashlane. It enables the Firebase admin SDK to connect to Firestore and Firebase Auth.

### `npm install`

This will install public packages.

### Run `firebase login`

I've added you as a member of fairdoor-v0 (staging) Firebase project, you can login with your email adress.

### Run `firebase project:list`

The fairdoor-v0 should be listed and selected.

### Run `npm run serve`

this will execute `firebase emulators:start --only functions` and will emulate locally cloud functions, enabling us to test them.
You won't have to deploy your functions

## Stripe

**Nothing to do!** Only being logged to Firebase (see firebase login step)

You can retrieve stripe API test key by doing `firebase functions:config:get`

N.B: Fairdoor Stripe test account is linked to Fairdoor staging DB. When a candidates signs up on Fairdoor staging candidte platform, a connected account on Fairdoor Stripe test account is created. You will be able to emulate the whole payment process as Stripe test environment emulate everything (connected account creation, payment etc)
