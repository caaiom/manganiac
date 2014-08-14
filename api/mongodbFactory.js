module.exports = function(url) {

  var _db = require('mongoose');

  var _conn = _db.connection;

  _conn.on('error', function (err){
    console.error("Não conseguiu conectar :(");
    console.error(err);
  });

  _conn.once('open', function () {
    console.log("Conectado!");
  });

  _db.connect(url);

  return {
    getDb : function() {
      return _db;
    },
  };
};
