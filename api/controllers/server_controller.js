module.exports = function(app){

  var expressHelper = require('../expressHelper.js')(app);

  //
  // GET /
  app.get('/', function(req, res){
    res.send('It works! Uhul');
  });

  //
  // GET /v
  app.get('/v', function(req, res){
    res.send('beta');
  })


  //
  // GET /err
  app.get('/err', function(req, res){

    try{
      throw new Error("Ô Loco, tem alguma coisa errada...");
      res.send(200);
    }catch(e){
      res.send(expressHelper.handleError(e));
    }
  });
};
