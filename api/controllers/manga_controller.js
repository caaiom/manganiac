
module.exports = function(app, db) {

  var mangaModel = require("../models/manga.js")(db);
  var expressHelper = require('../expressHelper.js')(app);

  //
  // GET /api/manga
  app.get('/api/manga', function (req, res) {
    mangaModel.get().find({}, function (err, mangas){
      if (err) return expressHelper.handleError(err);
      res.json({ mangas: mangas});
    });
  });


  //
  // POST /api/manga
  app.post('/api/manga', function (req, res) {
    var manga = new (mangaModel.get())(req.body);
    manga.save(expressHelper.handleError);
    res.send(200);
  });


  //
  // DELETE /api/manga
  app.delete('/api/manga', function (req, res) {
    mangaModel.get().remove({ _id: req.query.id },function(err){
      if (err) return expressHelper.handleError(err);

      res.send(200);
    });
  });


  //
  // PUT /api/manga
  app.put('/api/manga', function (req, res) {
    mangaModel.get().findOneAndUpdate({_id : req.body._id}, req.body, function(err){
        if(err){
          console.log(err);
          res.send(500);
        }
      }
    );

    res.send(200);
  });
};
