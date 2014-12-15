// download the avaliable paths in codeschool
// you can add your prefer path to `paths` variable
var req = require('request')
var cheerio = require('cheerio')
var colors = require('colors')
var fs = require('fs')
var mkdirp = require('mkdirp');

var base = "https://www.codeschool.com/"
var url = "https://www.codeschool.com/paths/"
var paths = ['ruby', 'javascript', 'html-css']

var options = {
    headers: {
        'Cookie': '""' // add your own cookie
    }
}
paths.forEach(function(path) {
    mkdirp.sync('./downloads/' + path);
    options.url = url + path;

    req(options, function(e, res, body) {
        if (e) {
            console.log(e);
            return;
        }

        console.log('Path:'.green, options.url.green)
        var $ = cheerio.load(body)
        $('.course-title-link').each(function() {
            var courseName = $(this).attr('href').substring('/courses/'.length);
            console.log(courseName)
            var coursePath = base + $(this).attr('href') + '/videos'
            console.log('Load:'.green, coursePath.green)

            options.url = coursePath;
            req(options, function(e, res, body) {
                var $ = cheerio.load(body)

                mkdirp('./downloads/' + path + '/' + courseName, function(e) {
                    if (e) console.log(e);

                    $('source:not([data-quality])').each(function() {
                        fs.appendFile('./downloads/' + path + '/' + courseName + '/videos.txt', $(this).attr('src') + '\n', function(err) {
                            if (err) console.log(err);
                        })
                    })
                })
            })
        });

    })
})
