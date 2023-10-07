var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator'),
    magazine = require('./routes/magazine');
    magazine_log = require('./routes/magazine_log');
		const cors = require('cors');

app.set('port', 3030);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
})); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());


// Add headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('/magazine', magazine.list);
app.get('/magazine/:id', magazine.detail);
app.post('/magazine', magazine.add);
app.put('/magazine/delete/:id', magazine.delete);
app.put('/magazine/:id', magazine.edit);

app.get('/magazine_log', magazine_log.list);
app.post('/magazine_log', magazine_log.add);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
