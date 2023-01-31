"use strict";

const functions = require("firebase-functions");
const { admin } = require("./config/admin");
const db = admin.firestore();
const log = (tolog) => functions.logger.log(tolog);

const collections = {
  customers: "stripeCustomers",
  candidates: "candidates",
  jobs: "jobs",
  jobApplications: "jobApplications",
  companies: "companies",
  recruiters: "recruiters",
};

const getStripeCustomerRef = (uid) =>
  db.collection(collections.customers).doc(uid);

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

/** For examples, checkout
 * @see https://github.com/stripe/stripe-firebase-extensions/blob/master/firestore-stripe-payments/functions/src
 */

/**
 * When a candidate is created, create a Stripe Express Account for them.
 *
 * @see https://stripe.com/docs/connect/express-accounts
 */
exports.createStripeExpressAccountForCandidates = functions.firestore
  .document("candidates/{candidateID}")
  .onCreate(async (snap) => {
    const candidate = snap.data();
    const candidateName = `${candidate.firstName} ${candidate.lastName}`;

    const statement = `${candidateName}`
      .replace(/[^a-z0-9]/gi, " ")
      .substring(0, 20);

    const account = await stripe.accounts.create({
      country: "US",
      type: "express",
      business_type: "individual",
      business_profile: {
        name: candidateName,
        product_description: `Candidate Assessment ${candidateName}`,
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      settings: {
        payments: {
          statement_descriptor: statement,
        },
      },
      email: candidate.email,
    });
    try {
      await getStripeCustomerRef(candidate.uid).set({
        accountId: account.id,
      });
      log(
        `Stripe: account created for candidate ${candidate.email}: ${account.id}`
      );
    } catch (error) {
      log(
        `Error in stripe account creation with candidate ${candidate.email} : ${error}`
      );
    }
    return;
  });

/**
 * To deploy functions do on the terminal
 * firebase deploy --only functions:<NAME OF YOUR FUNCTION>
 */

/**
 * Generate an invoice on call on behalf of a candidate to a Stripe customer
 */

/**
 * Webhook to retrieve payment information and store them in the collection
 * assessmentsPayments
 */
