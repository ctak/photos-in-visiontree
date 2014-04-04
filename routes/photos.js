/*
 * Photo Routes
 */

var request = require('request');
var fs = require('fs');
var util = require('util');

module.exports = function (app) {

    app.put('/:file', function (req, res, next) {
        console.log('file: %s', req.params.file);
        req.pipe(fs.createWriteStream(__dirname + '/../tmp/' + req.params.file));
        res.send('Okay');
    });

    app.get('/:file', function (req, res, next) {
        var path = __dirname + '/../tmp/' + req.params.file;

        fs.exists(path, function (exists) {
            if (! exists) {
                res.status(404).send('Not found');
                // res.status(404);
                return;
            }

            fs.createReadStream(path).pipe(res);
        });
    });

    app.del('/p/:file', function (req, res, next) {
        var path = __dirname + '/../tmp/' + req.params.file;

        fs.exists(path, function (exists) {
            if (! exists) {
                res.send('Not found');
                return;
            }
            
            fs.unlink(path, function (err) {
                if (err) throw err;
                res.send('Okay');
            });
        });

    });

};
