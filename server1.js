const { Pool } = require('pg');
const pool = new Pool({
  user: 'pythonspot',
  host: 'localhost',
  database: 'users',
  password: 'secret',
  port: 5432,
});


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.get('/users', function (req, res, next) {

 if(req.query.user_id){
	   pool.query('SELECT * FROM users WHERE id = $1', [req.query.user_id], (err, res1) => {
	   if (err) {
                    res.status(400).send(err);
		    throw err;
  	   }
	   if(res1.rows[0]){
           	console.log('user:', res1.rows[0].username);
           	res.send(res1.rows[0].username);
	   }
	   else
		res.send("Undefined user_id");
       });
    }
 else 
	  res.send("Input user_id");
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(function (req, res) {
  if(req.body.id)
  {
    res.setHeader('Content-Type', 'text/plain')
    pool.query("INSERT INTO users(id, username) values($1, $2)", [req.body.id, req.body.username])
  }
  res.end(JSON.stringify(req.body, null, 2))
})


app.listen(3003);

