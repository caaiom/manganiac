module.exports = function(db){

  var mangaSchema = new db.Schema({
    title: {type: String, required: true},
    author: String,
    currentVolume: {type: Number, required: true},
    lastVolumePurchased: Number,
    rate: {type: Number, default: 0, min: 0, max: 5},
    publisher: String,
    buyImportance: {type: Number, default: 0, min: 0, max: 5},
    price: {type: Number, get: getPrice, set: setPrice},
    finished: {type: Boolean, default: false},
    linkToDescription: String
  });

  var model = db.model('Manga', mangaSchema);


  return{
    get: function(){
      return model;
    }
  };
};
