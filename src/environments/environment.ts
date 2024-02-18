// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiBaseUri: 'https://api.outilly.fr/',
  frontBaseUri: 'https://www.outilly.fr/',
  mediaBaseUri: 'https://media.outilly.fr/',
  mondialBrand: 'CC21IBBI',
  testCard: false,
  appAbsoluteRootPath: '/var/www/outilly-api',
  GATrackingCode: 'G-SMS7VE23QN',
  UATrackingCode: 'UA-186900631-1',
  algoliaIndexName: 'prod_outilly',
  universalPort: 4000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
