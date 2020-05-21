// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDNZexjA2LeyHtSnrK56LkAGUdW5L3B-Cs",
    authDomain: "cardvoting.firebaseapp.com",
    databaseURL: "https://cardvoting.firebaseio.com",
    projectId: "cardvoting",
    storageBucket: "cardvoting.appspot.com",
    messagingSenderId: "164535101203",
    appId: "1:164535101203:web:049e072cc8a97dc5399ce6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
