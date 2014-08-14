var mongourl = 'mongodb://localhost/manga';
var express = require('express');
var bodyParser = require('body-parser');

var db = require('./mongodbFactory.js')(mongourl);

var app = express();
app.use(bodyParser());

var expressHelper = require('./expressHelper.js')(app);
expressHelper.setDefaultSettingsHeadersForAllRoutes();


//
// add controllers.
require('./controllers/server_controller.js')(app);
require('./controllers/manga_controller.js')(app, db.getDb());

app.listen(1337);
