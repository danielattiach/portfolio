const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
  app.use(proxy('/auth/github', { target: 'http://localhost:5000' }));
  app.use(proxy('/auth/logout', { target: 'http://localhost:5000' }));
  app.use(proxy('/auth/current', { target: 'http://localhost:5000' }));
}
