const config = {
  firebase: {
    "fairdoor-app": {
      // prod
      apiKey: process.env.NEXT_PUBLIC_API_KEY_PROD,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_PROD,
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_PROD,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID_PROD,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_PROD,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_PROD,
      appId: process.env.NEXT_PUBLIC_APP_ID_PROD,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_PROD,
    } as IFirebaseConfigByProject,
    "fairdoor-v0": {
      // staging
      apiKey: process.env.NEXT_PUBLIC_API_KEY_STAGING,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN_STAGING,
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL_STAGING,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID_STAGING,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET_STAGING,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID_STAGING,
      appId: process.env.NEXT_PUBLIC_APP_ID_STAGING,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID_STAGING,
    } as IFirebaseConfigByProject,
  },
  stripe: {
    apiKey: process.env.NEXT_PUBLIC_STRIPE_API_KEY,
    apiTestKey: process.env.NEXT_PUBLIC_STRIPE_API_TEST_KEY,
  },
};

type IFirebaseConfigByProject = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

type IFirebaseConfig = {
  "fairdoor-v0": IFirebaseConfigByProject;
  "fairdoor-app": IFirebaseConfigByProject;
};
type config = {
  firebase: IFirebaseConfig;
  stripe: { apiKey: string; apiTestKey: string };
};
export default config as config;
