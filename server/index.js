const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static('task-management-system-sr'));
const port = process.env.PORT || 3000;
app.listen(port);
console.log("Server running at ",port);