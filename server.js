const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const ImgProcessApi = require('./ImgProcessApi');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname })
});

app.post('/uploadImg', (req,res)=> {
    return ImgProcessApi.processImg(req.files, req.body, (err, filePath)=>{
        if(err) res.status(400).send(err)
        else res.status(200).sendFile(filePath)
    })
})

app.listen(port, function () {
  console.log('Server is running on PORT',port);
});
