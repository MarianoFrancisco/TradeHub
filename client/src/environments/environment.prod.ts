export const environment = {
  production: true,
  backend: 'http://www.internal.tradehub.gt/',
  baseBackend: '',
  urlImg: ''
};
environment.baseBackend = environment.backend + 'api/';
environment.urlImg = environment.backend + 'storage/img/';
