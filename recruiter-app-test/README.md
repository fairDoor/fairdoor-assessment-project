# A minimal recruiter app

## Set up your environment

### `.env`

You can find the env file that I shared with you on dashlane. It enables you to connect to Firestore staging

### `npm install`

This will install public packages and a private Fairdoor package, that contains a number of React components shared across Fairdoor platforms
You need an npm auth token to download this library. This token is shared with you on Dashlane.
In the file `.npmrc`you can replace NODE_AUTH_TOKEN by this token.
Be careful, DO NOT COMMIT the .npmrc file with the value of this token.

### Run `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Don't deploy

You won't be able to deploy as the hosting for this app is not configure and it is not the gol.

## What you can do with this app

- sign in
- sign up as a new company and a new recruiter
- reset your password => put an email adress that enables you to receive an email with a reset link
- in the page "/candidates", see the list of applications at the "assessment step" and click on the button "Pay candidate"

## What you will build

- when clicking on the "Pay candidate" button in the applications table, show a modal that list all assessments related to the application
- enable the user to select assessments
- enable the user to pay the candidate when clicking on the button "pay" in the modal.

## MUI

you won't need the MUI key to have access to MUI functionalities

## Your ressources and test workflow:

- in your local recruiter test app
  - you can sign up, creating a new company and a new recruiter, member of this new company
- in https://staging-recruiter.web.app/, you can create a new job offer, it has to be published to be viewable here https://fairdoor-v0.web.app/
- https://fairdoor-v0.web.app/ => staging candidate application, you can sign up as a new candidate and apply to a job offer.
- To view this application locally in your recruiter test app, change in the Firebase "fairdoor-v0" console the application status to "assessment"
