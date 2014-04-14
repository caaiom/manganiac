var Mongoose = require('Mongoose');
var express = require('express');

var app = express();
var db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function () {
	console.log("conectou ao mongodb");
});

Mongoose.connect('mongodb://localhost/manga');

var mangaSchema = new Mongoose.Schema({
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

var Manga = Mongoose.model('Manga', mangaSchema);

app.get('/getAllItens', function (req, res) {
	Manga.find({}, function (err, mangas){
		if (err) res.send(500);
		res.header('Access-Control-Allow-Origin', '*');
    	res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
		res.json({ mangas: mangas});
	});
});
app.listen(1337);

/**var edition = new Manga({
	title: 'Rurouni Kenshin',
	author: 'Nobuhiro Watsuki',
	currentVolume: 18,
	lastVolumePurchased: 13,
	rate: 4,
	publisher: 'JBC',
	buyImportance: 3,
	price: 1390,
	finished: false,
	linkToDescription: 'http://myanimelist.net/manga/22/Rurouni_Kenshin'
});

edition.save(function(err, edition) {
	if (err) return console.error(err);
	console.dir(edition);
});*/

function getPrice(num) {
	return (num/100).toFixed(2);
}

function setPrice(num){
	return num * 100;
}