export const pageInfo = {
  BRAND_NAME: 'Outilly',
  PAGE_NAME_SEPARATOR: ' - ',
};

export const prices = {
  MIN_PRICE_FACTOR: 0.72,
  SECURISATION_FEES_FACTOR: 0.06,
  SECURISATION_FEES_MINIMUM: 150
}

export const contact = {
  MAX_MESSAGE_LENGTH: 600
}

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
}

export const media = {
  MAX_UPLOAD_VIDEOS: 1,
  MAX_UPLOAD_PICTURES: 10,
  MAX_UPLOAD_SIZE: 200,
  VIDEO_FORMAT_ACCEPTED: ".mp4, .avi, .mov",
  PICTURES_FORMAT_ACCEPTED: ".jpg, .jpeg, .png"
}

export const specialCharacters: string = "@[]^_!\"#$%&'()*+,-./:;{}<>=|~?"
export const staticStates: string[] = ['new', 'excellent', 'good', 'acceptable', 'forparts'];
