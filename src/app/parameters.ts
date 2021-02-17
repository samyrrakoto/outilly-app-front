export const pageInfo = {
  BRAND_NAME: 'Outilly',
  PAGE_NAME_SEPARATOR: ' - ',
};

export const staticLinks = {
  BLOG_URI: 'https://blog.outilly.com'
};

export const user = {
  MIN_AGE: 18,
  MAX_AGE: 100
};

export const pwd = {
  MIN_PWD_LENGTH: 7,
  SPECIAL_CHARACTERS: "@[]^_!\"#$%&'()*+,-./:;{}<>=|~?"
}

export const prices = {
  MIN_PRICE_FACTOR: 0.62,
  SECURISATION_FEES_FACTOR: 0.06,
  SECURISATION_FEES_MINIMUM: 150,
  MAX_PRODUCT_PRICE: 1000000
};

export const contact = {
  MAX_MESSAGE_LENGTH: 2000
};

export const questions = {
  MAX_QUESTION_LENGTH: 100,
  MAX_ANSWER_LENGTH: 600
};

export const country = {
  COUNTRIES_ACCEPTED: [
    {
      isocode: 'FR',
      label: 'France',
    },
    {
      isocode: 'LU',
      label: 'Luxembourg'
    },
    {
      isocode: 'BE',
      label: 'Belgique'
    },
    {
      isocode: 'CH',
      label: 'Suisse'
    }
  ]
};

export const media = {
  MAX_UPLOAD_VIDEOS: 1,
  MIN_UPLOAD_PICTURES: 2,
  MAX_UPLOAD_PICTURES: 10,
  MAX_UPLOAD_SIZE: 200,
  VIDEO_FORMAT_ACCEPTED: ".mp4, .avi, .mov",
  PICTURES_FORMAT_ACCEPTED: ".jpg, .jpeg, .png"
};

export const productDisplay = {
  NB_RESULTS: 15,
  NB_RESULTS_HOMEPAGE: 30,
  NB_RESULTS_MOBILE: 1
};

export const algolia: any = {
  APP_ID: 'YOYXGVRIH4',
  API_KEY: 'da2ebec0e3025fc4f211dd5a74d4836d',
  INDEX_NAME: 'dev_outilly'
};
export const staticStates: string[] = ['new', 'excellent', 'good', 'acceptable', 'forparts'];
export const savSubjects: string[] = [
  'Obtenir des informations complémentaires pour une annonce',
  'J\'ai une question à propos de ma commande (SAV)',
  'Je rencontre un problème technique sur le site',
  'Je suis professionnel(le) et souhaite être accompagné(e)',
  'Je souhaite contacter les équipes marketing',
  'Je souhaite modifier mes informations personnelles',
  'Je souhaite modifier mes coordonnées bancaires',
  'Autre'
];
export const categoryIcons: any = {
  MECANIC: 'wrench',
  DIY: 'hammer',
  GARDEN: 'seedling',
  WORKSHOP: 'warehouse'
}
