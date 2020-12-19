const { createProxyMiddleware } = require('http-proxy-middleware');
// const express = require('express');

// const app = express();

module.exports = function (app) {
  app.use('/opendata', createProxyMiddleware({ target: 'https://data.gov.ru/sites/default/files', changeOrigin: true }));
  app.use('/stat_lib_prime', createProxyMiddleware({ target: 'https://opendata.mkrf.ru/v2', changeOrigin: true }));
  app.listen(3001);
};
