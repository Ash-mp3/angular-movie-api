
export const environment = {
/*   apiUrl: 'http://localhost:8000',
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBXvc8NZ_NeYUt3URa6TCsOLEGXXNIf1Tg',
    authDomain: 'angular-movie-api.firebaseapp.com',
    projectId: 'angular-movie-api',
    storageBucket: 'angular-movie-api.appspot.com',
    messagingSenderId: '426774223621',
    appId: '1:426774223621:web:778f3757e2323d3469b56c',
    measurementId: 'G-R2ZBT90PC4',
  }, */
    apiUrl: process.env['API_URL'],
    firebaseConfig: {
      apiKey: process.env['FIREBASE_CONFIG_API_KEY'],
      authDomain: process.env['FIREBASE_CONFIG_AUTH_DOMAIN'],
      projectId: process.env['FIREBASE_CONFIG_PROJECT_ID'],
      storageBucket: process.env['FIREBASE_CONFIG_STORAGE_BUCKET'],
      messagingSenderId: process.env['FIREBASE_CONFIG_MESSAGING_SENDER_ID'],
      appId: process.env['FIREBASE_CONFIG_APP_ID'],
      measurementId: process.env['FIREBASE_CONFIG_MEASUREMENT_ID'],
    }
  };