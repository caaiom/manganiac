var Mongoose = require('Mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    if ('OPTIONS' == req.method){
        return res.send(200);
    }
    next();
});
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

app.get('/api/getAllItens', function (req, res) {
	Manga.find({}, function (err, mangas){
		if (err) res.send(500);
		res.json({ mangas: mangas});
	});
});

app.post('/api/insertItem', function (req, res) {
	
	var edition = new Manga({
		title: req.body.title,
		author: req.body.author,
		currentVolume: req.body.currentVolume,
		lastVolumePurchased: req.body.lastVolumePurchased,
		rate: req.body.rate,
		publisher: req.body.publisher,
		buyImportance: req.body.buyImportance,
		price: req.body.price,
		finished: req.body.finished,
		linkToDescription: req.body.linkToDescription	
	});

	edition.save(function (err, manga) {
		if (err) res.send(500);
		res.send(201);
	});
});

app.listen(1337);

function getPrice(num) {
	return (num/100).toFixed(2);
}

function setPrice(num){
	return num * 100;
}