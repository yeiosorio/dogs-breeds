export const environment = {
  production: false,
  apiUrl: 'https://dog.ceo/api',
  endpoints: {
    breeds: '/breeds/list/all',
    breedImages: '/breed/{breed}/images',
    subBreedImages: '/breed/{breed}/{subBreed}/images'
  },
  version: '1.0.0',
  appName: 'Dogs Breeds App'
}; 