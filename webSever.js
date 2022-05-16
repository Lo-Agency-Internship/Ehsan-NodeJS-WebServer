 const http = require('http');
 const fs = require('fs');
 const path = require('path');

 const server = http.createServer(
     (req, res) => {

         let filePath = path.join(
             __dirname,
             'public',
             req.url === '/' ? 'index.html' : req.url
         )
         let extname = path.extname(filePath)
         console.log(extname)
         let contentType = 'text/html'
         switch (extname) {
             case '.js':
                 contentType = "text/javscript"

                 break;
             case '.css':
                 contentType = "text/css"

                 break;
             case '.json':
                 contentType = "text/json"

                 break;
             case '.png':
                 contentType = "image/png"

                 break;
             case '.jpg':
                 contentType = "text/jpeg"

                 break;
             case '.mp4':
                 contentType = "video/mp4"

                 break;
         }
         if (contentType === 'text/html' && extname === '') {
             filePath += '.html'
         }
         fs.readFile(filePath,
             (err, data) => {
                 if (err) {
                     if (err.code == 'ENOENT') {
                         fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
                             res.writeHead(404, {
                                 "Content-Type": 'text/html'
                             })
                             res.end(data)
                         })
                     }

                 } else {
                     res.writeHead(200, {
                         'Content-Type': contentType
                     })
                     res.end(data)
                 }
             })


     }

 );



 server.listen(3000, () => console.log('server running on port 3000'));