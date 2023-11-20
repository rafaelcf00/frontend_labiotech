// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/live/ws',
    createProxyMiddleware({
      target: 'wss://snapshots.raintank.io',
      ws: true,
      changeOrigin: true,
      pathRewrite: {
        '^/api/live/ws': '/api/live/ws',
      },
    })
  );
};
