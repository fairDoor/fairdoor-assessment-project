"use strict";

const functions = require("firebase-functions");
const { admin } = require("./config/admin");
const db = admin.firestore();
const log = (tolog) => functions.logger.log(tolog);

const stripe = require("stripe")(functions.config().stripe.key);

const collections = {
  stripePayments: "stripePayments", // collection to store payments
  stripeCompanies: "stripeCompanies",
  stripeCandidates: "stripeCandidates",
  candidates: "candidates",
  jobs: "jobs",
  jobApplications: "jobApplications",
  companies: "companies",
  recruiters: "recruiters",
  assessments: "assessments",
};

const getStripeCandidateRef = (uid: string) =>
  db.collection(collections.stripeCandidates).doc(uid);

const getStripeCompaniesRef = (companyId: string) =>
  db.collection("stripeCompanies").doc(companyId);

const createStripeCompany = async (companyId: string, companyName: string) => {
  return await stripe.customers
    .create({
      name: companyName,
      metadata: {
        companyId: companyId,
      },
    })
    .then(async (customer) => {
      log(
        `Stripe: created company account ${customer.id} for company ${companyId}`
      );
      await getStripeCompaniesRef(companyId).set({
        stripeCompanyId: customer.id,
      });
      return customer.id;
    })
    .catch(async (error) => {
      log(`Stripe: Error in stripe company account creation: ${error}`);
    });
};

const getOrCreateStripeCompanyId = async (
  companyId: string,
  companyName: string
) => {
  return await getStripeCompaniesRef(companyId)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        // check if stripe company account exists
        const stripeCustomer = await stripe.customers.search({
          // eslint-disable-next-line no-useless-escape
          query: `name:\'${companyName}\'`,
        });
        if (Object.keys(stripeCustomer?.data).length !== 0) {
          log(
            `Stripe: account exists for company ${companyId}: ${
              doc.data().stripeCompanyId
            }`
          );
          return doc.data().stripeCompanyId;
        } else {
          return await createStripeCompany(companyId, companyName);
        }
      } else {
        return await createStripeCompany(companyId, companyName);
      }
    })
    .catch(async (error) => {
      log(
        `Stripe: Error in getStripeCompaniesRef for company ${companyId}: ${error}`
      );
    });
};

/**
 * You can test your function with the following bash command:
 * firebase emulators:start --only functions
 */

/**
 * Generate an invoice on call on behalf of a candidate to a Stripe customer
 */

/**
 * Webhook to retrieve payment information and store them in the collection
 * assessmentsPayments
 */
