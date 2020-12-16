const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/opendata',
    createProxyMiddleware({
      target: 'https://data.gov.ru/sites/default/files',
      changeOrigin: true,
    }),
  );
};

module.exports = function (app) {
  app.use(
    '/stat_lib_prime',
    createProxyMiddleware({
      target: 'https://opendata.mkrf.ru/v2',
      changeOrigin: true,
    }),
  );
};
