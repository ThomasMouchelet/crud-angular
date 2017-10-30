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

let usersSql = () => {
  id = 1;
  let sql = 'SELECT * FROM users WHERE id = ' + con.escape(id);    
  con.query(sql, function (err, result, fields) {
      if (err) throw err;
      return result[0];
  });
};

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
            token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email, nickname: user.nickname}, secret);
          }else{
            token = jwt.sign({ iss: 'http://localhost:4201', role: 'user', email: req.body.email, nickname: user.nickname}, secret);
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


// auth.post('/login', (req, res) => {
//     if(req.body) {
//       const email = req.body.email.toLocaleLowerCase();
//       const password = req.body.password.toLocaleLowerCase();
//       const index = users.findIndex(user => user.email === email);
//       console.log('index ', index);
//       console.log('user ', users[index]);
//       if(index > -1 && users[index].password === password) {
//         let user = users[index]; 
//         let token = '';
//         if(user.email === 'tu@test.fr') {
//           token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email, nickname: user.nickname}, secret);
//         } else {
//           token = jwt.sign({ iss: 'http://localhost:4201', role: 'user', email: req.body.email, nickname: user.nickname}, secret);
//         }
//         res.json({ success: true, token: token});
//       } else {
//         res.status(401).json({ success: false, message : 'identifiants incorrects' });
//       }
//     } else {
//       res.status(500).json({ success: false, message: 'données manquantes'});
//     }
//   });

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
