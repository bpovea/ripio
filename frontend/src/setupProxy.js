/*
 * Proxying API Requests in development to avoid CORS issues
 * source: https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_RIPIO_API_LOCAL,
      changeOrigin: true,
    })
  );
};