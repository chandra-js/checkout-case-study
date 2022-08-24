var express = require('express');
var compression = require('compression');
var logger = require('morgan');
var path = require('path');
const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, './dist')));
app.use(logger('combined'));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'./dist/index.html'));
});
const port = 3000;
const server = app.listen(port, '0.0.0.0', () => console.log(`Server up and running on port ${port}`));