var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var formidable = require('formidable');
var path = require("path");
var fs = require('fs-extra')

app.use(bodyParser({defer: true}));

// Routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/api/upload', function(req, res, next) {
    var form = new formidable.IncomingForm();

    form.uploadDir = "./upload";
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        var filename = './upload/'+files.fileToUpload.name;
        while(fs.existsSync(filename)) {
            filename = filename + '(1)';
        }
        fs.rename(files.fileToUpload.path, filename, function(err) {
        if (err)
            throw err;
          console.log('renamed complete');  
        });
          res.end();
    });
});

// Listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on localhost:'+ port);
