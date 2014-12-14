//use aria2 to download, but this file is not completed
require('shelljs/global');
fs = require('fs')

var aria2;

if (!which('aria2') && !which('aria2c')) {
    echo("require aria2")
    exit(1)
}

if (which('aria2')) aria2 = 'aria2';
if (which('aria2c')) aria2 = 'aria2c';

var paths = ['ruby', 'javascript', 'html-css']

paths.forEach(function(path) {
    fs.readdir('./downloads/' + path, function(e, course) {
        if (course == ".DS_Store") return;
        if (e) console.log(e);

        course.forEach(function(v) {
            var file = './downloads/' + path + '/' + v + '/videos.txt'

            cd('./downloads/' + path + '/' + v)

            var child = exec(aria2 + ' -i ' + 'videos.txt', {
                async: true
            });
            child.stdout.on('data', function(data) {
                /* ... do something with data ... */
                console.log(data)
            });
        })
    })
})