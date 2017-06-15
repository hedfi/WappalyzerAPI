var express = require('express');
var router = express.Router();
const wappalyzer = require('wappalyzer');
var $ = require('check-valid-url');

/* GET home page. */
router.post('/', function(req, res, next) {

    var url = req.body.url;

    if ($.isUrl(url)){
        res.setHeader('Content-Type', 'application/json');

        wappalyzer.run([url, '--quiet'], function(stdout, stderr) {
            if ( stdout ) {
                res.send(stdout);
            }

            if ( stderr ) {
                res.send(stderr);
            }
        });
    } else {
        res.status(404)        // HTTP status 404: NotFound
            .send('Invalid URL');
    }

});

module.exports = router;
