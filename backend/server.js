const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// JWT
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');
// MYSQL
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

const auth = express.Router();

auth.post('/login', (req, res) => { 
  if(req.body){
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    let sql = 'SELECT * FROM users WHERE email =' + con.escape(email);    
    con.query(sql, function (err, result, fields) {
        let token = '';
        if (err) {
          console.log(err);
          res.send({ success: false, message: 'query error', error: err });
          return;
        }
        let user = result[0];
        if(user && (user.password == password)) {
          if(user.role == 'admin'){
            token = jwt.sign({ id: user.id, role: 'admin', email: req.body.email}, secret);
          }else{
            token = jwt.sign({ 
              id: user.id, 
              role: 'user', 
              email: req.body.email,
              firstName: user.firstName,
              lastName: user.lastName
            }, secret);
          }
          res.json({ success: true, token: token});
        }else {
          res.status(401).json({ success: false, message : 'identifiants incorrects' });
        }
    });
  }else{
    res.status(500).json({ success: false, message: 'données manquantes'});
  }
});

auth.post('/update-profil', (req, res) => { 
  const user = req.body;
  var sql = "UPDATE users SET firstName = ?, lastName = ? WHERE id =" + user.id;
  con.query(sql, [user.firstName,user.lastName],function (err, result) {
    if (err) throw err;
    res.json({ success: true, message: 'Profil modifié'});
  });
})

// API
const api = express.Router();

api.get('/items', (req, res) => {
    let sql = "SELECT * FROM items"
    con.query(sql, function (err, result, fields) {
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
