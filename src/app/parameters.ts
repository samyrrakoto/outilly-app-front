export const MENU: any = {
  ID: 'my-menu'
};

export const VIEWPORT: any = {
  MOBILE: 768,
  TABLET: 1023
};

export const pageInfo: any = {
  BRAND_NAME: 'Outilly',
  PAGE_NAME_SEPARATOR: ' - ',
};

export const staticLinks: any = {
  BLOG_URI: 'https://blog.outilly.com',
  LANDING_PAGE: 'https://blog.outilly.com/pro'
};

export const user: any = {
  MIN_AGE: 18,
  MAX_AGE: 100
};

export const pwd: any = {
  MIN_PWD_LENGTH: 7,
  SPECIAL_CHARACTERS: "@[]^_!\"#$%&'()*+,-./:;{}<>=|~?"
}

export const prices: any = {
  MIN_PRICE_FACTOR: 0.62,
  SECURISATION_FEES_FACTOR: 0.06,
  SECURISATION_FEES_MINIMUM: 150,
  MAX_PRODUCT_PRICE: 1000000
};

export const contact: any = {
  MAX_MESSAGE_LENGTH: 2000
};

export const questions: any = {
  MAX_QUESTION_LENGTH: 100,
  MAX_ANSWER_LENGTH: 600
};

export const country: any = {
  COUNTRIES_ACCEPTED: [
    {
      isoCode: 'FR',
      name: 'France',
    },
    {
      isoCode: 'LU',
      name: 'Luxembourg'
    },
    {
      isoCode: 'BE',
      name: 'Belgique'
    },
    {
      isoCode: 'CH',
      name: 'Suisse'
    }
  ]
};

export const media: any = {
  MAX_UPLOAD_VIDEOS: 1,
  MIN_UPLOAD_PICTURES: 2,
  MAX_UPLOAD_PICTURES: 10,
  MAX_UPLOAD_SIZE: 200,
  VIDEO_FORMAT_ACCEPTED: ".mp4, .avi, .mov",
  PICTURES_FORMAT_ACCEPTED: ".jpg, .jpeg, .png"
};

export const productDisplay: any = {
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
};

export const toolsAndMachines: string[] = ['Outillage à main', 'Electrique / Filaire', 'Pneumatique / À air', 'Electroportatif / À batterie', 'Thermique / Moteur à carburant'];

export const filterAliases: any = [
  {
    name: "Consommable & accessoires",
    alias: "consommable"
  },
  {
    name: "BTP / Brico / Maison",
    alias: "btp"
  },
  {
    name: "Garage / Mécanique",
    alias: "mecanic"
  },
  {
    name: "Espace verts / Paysage",
    alias: "garden"
  },
  {
    name: "Outillage à main",
    alias: "handy"
  },
  {
    name: "Electrique / Filaire",
    alias: "wire"
  },
  {
    name: "Electroportatif / À batterie",
    alias: "battery"
  },
  {
    name: "Pneumatique / À air",
    alias: "pneumatic",
  },
  {
    name: "Thermique / Moteur à carburant",
    alias: "thermic"
  }
]

export const storage: any = {
  PRODUCT_ONBOARDING: 'product-onboarding',
  REDIRECT_AFTER_LOGIN: 'redirect_after_login',
  COOKIES: 'cookies',
  TYPEFORM: 'typeform',
  ESTIMATION_ID: 'estimationId',
  ESTIMATION_STR_ID: 'estimationStrId',
  ESTIMATION_MEDIA: 'estimationMedia',
  ESTIMATION_DATA: 'estimationData',
  PRODUCT_ID: 'id',
  PRODUCT_STR_ID: 'strId'
};
