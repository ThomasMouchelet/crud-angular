const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "angular",
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

con.connect(function(err) {
    if (err) throw err;
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const api = express.Router();
const auth = express.Router();

api.get('/items', (req, res) => {
    con.query("SELECT * FROM items", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

api.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let sql    = 'SELECT * FROM items WHERE _id = ' + con.escape(id);    
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.use('/api', api);
app.use('/auth', auth);

const port = 4201;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
}); 
