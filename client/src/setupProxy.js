const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  //adjust for troubleshooting
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }))
  //app.use("/auth/*", proxy({ target: 'http://localhost:5000' }));
  app.use("/api/*", proxy({ target: "http://localhost:5000" }));
  
}