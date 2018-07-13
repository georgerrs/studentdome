/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const url = process.env.WEBSITE_URL || 'http://localhost:3001';
export const sitename = process.env.SITENAME || 'RentALL';

// default locale is the first one
export const locales = ['en-US', 'cs-CZ'];

export const databaseUrl = process.env.DATABASE_URL || 'mysql://root:Root123!@localhost/rentall113';


// Listing Photos Upload Directory
export const fileuploadDir = process.env.FILEUPLOAD_DIR || './images/upload/';

// Logo upload directory
export const logouploadDir = process.env.LOGOUPLOAD_DIR || './images/logo/';

// Home page Banner upload directory
export const banneruploadDir = process.env.BANNER_UPLOAD_DIR || './images/banner/';

// User Profile Photos Upload Directory
export const profilePhotouploadDir = process.env.PROFILE_PHOTO_UPLOAD_DIR || './images/avatar/';

//Document Upload
export const documentuploadDir = process.env.FILEUPLOAD_DIR || './images/document/';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

};

export const googleMapAPI = process.env.GOOGLE_MAP_API || 'AIzaSyDqz0MgE60D4jBsSHJz2S8wjvacVpc_ZNQ';

// site key for google recaptcha
export const googleCaptcha = {
  sitekey: '6LcKa1MUAAAAAGT1914w0-yhcVoBfKWoXO64WhKp',
};

// SMS verification
export const sms = {
  twilio: {
    accountSid: 'AC542568b680b1d3016f81bafa2ffef0cc',
    authToken: '0e31673ed59b9695616c8d6be0c822d8',
    phoneNumber: '+18503678822'
  }
};

export const payment = {

  paypal: {
    email: process.env.PAYPAL_APP_EMAIL || 'redhoodcool-business@gmail.com',
    clientId: process.env.PAYPAL_APP_CLIENT_ID || 'Abax6FHO5FW8ausREpc182FX6Jwgq7ICYyUF6IBf_Pfi8-40CIXHMZL4l2TkMrVUznVG_2Q8yQLUb860',
    secret: process.env.PAYPAL_APP_SECRET || 'EG6BrUaD-nArhcjJT3CDzCPeM-ENANATVbsXvTC-y-CMIVCccjP0ehkIX6Q5Vh9wC2HRInzxRsPfyFQZ',
    host: process.env.PAYPAL_HOST || 'api.sandbox.paypal.com',
    returnURL: process.env.PAYPAL_RETURN_URL || `${url}/success`,
    cancelURL: process.env.PAYPAL_CANCEL_URL || `${url}/cancel`,
    redirectURL: {
      success: process.env.PAYPAL_SUCCESS_URL || '/users/trips/itinerary',
      cancel: process.env.PAYPAL_CANCEL_URL || '/contact',
    },
  },

  stripe: {
    secretKey: 'sk_test_Q7dP4lBuYaH404rnlFdbbga8'
  }

};

// Email Settings
export const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp-pulse.com',
  port: process.env.SMTP_PORT || 2525,
  email: process.env.SMTP_LOGIN_EMAIL || 'redhoodcool@gmail.com',
  sender: process.env.SMTP_FROM_NAME || 'RentALL',
  password: process.env.SMTP_LOGIN_PASSWORD || '6bMnRna3BM8gj',
  secure: process.env.SMTP_SECURE || false,
  tls: process.env.SMTP_TLS || false,
};


export const auth = {

  jwt: { secret: process.env.JWT_SECRET || 'Rent ALL' },

  redirectURL: {
    login: process.env.LOGIN_URL || '/dashboard',
    verification: process.env.LOGIN_URL || '/user/verification',
  },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID || '327085844349925',
    secret: process.env.FACEBOOK_APP_SECRET || '66b618a86dcf5993d137e44e4ec999fc',
    returnURL: process.env.FACEBOOK_CLIENT_URL || `${url}/login/facebook/return`,
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID || '218729354524-3llviln522cu8rhm4jo6b4pr5j644d8c.apps.googleusercontent.com',
    secret: process.env.GOOGLE_CLIENT_SECRET || 'HGY5DVcxPxWFcj9e5Id_MPI-',
    returnURL: process.env.GOOGLE_CLIENT_URL || `${url}/login/google/return`,
  }

};
