module.exports = function(app){

  return {
    setDefaultSettingsHeadersForAllRoutes: function(){
      app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        if ('OPTIONS' == req.method){
          return res.send(200);
        }
        next();
      });
    },

    handleError: function(err, http_status){
      if(err){
        console.error(err);
      }

      return http_status || 500;
    },
  }
}
