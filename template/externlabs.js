'use script'
var pdfmake = require('pdfmake');
const path=require('path');
const express = require('express')
const app = express()
//const temp=require('./template.js')
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
//let test="kailash";

 
app.post('/generate-pdf', (req, res) => {
    var data=req.body.data;
    console.log(data)
    var docDefinition = {
        header: //'simple text',
        {
            columns:[
                
                    {
                        image: path.join(__dirname, "./", "images", `/externlabs.jpg`),
                        width: 90,
                        height: 60,
                }
            ]
        },
      
        footer: {
          columns: [
            //'Left part',
            { text: 'page 1', alignment:"center" },
            // {"Image":'externlabs.jpg'},
          ]
        },
      
        content: [
            {text:`${data}`,
            marginTop:30,
        },
          
        ]
      };
 
  const doc = new pdfmake({
    Roboto: { normal: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64') }
  }).createPdfKitDocument(docDefinition)
  var chunks = [];
  var result;
  doc.on('readable', function () {
    var chunk;
    while ((chunk = doc.read(9007199254740991)) !== null) {
      chunks.push(chunk);
    }
  });
  doc.on('end', function () {
    result = Buffer.concat(chunks);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-disposition', 'attachment; filename=test.pdf');
    res.send(result);
  });
  doc.end();
 
});
 
app.listen(3000, () => console.log('Example app listening on port 3000!'))