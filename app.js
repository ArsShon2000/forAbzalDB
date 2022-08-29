// import List from './List'


require('dotenv').config()

const express = require('express')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

const app = express()
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (error) => {
    if (error) return console.error(error);

    console.log('connected successfully')
})

app.use(bodyParser.json())
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
      // if(whitelist.includes(origin || ""))
      //     return callback(null, true)
      //
      // callback(new Error('Not allowed by CORS'));
      console.log("origin: ", origin);
      callback(null, true); // everyone is allowed
  }
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}))

app.post('/create-db-w', () => {
    db.run(
        `CREATE TABLE wNum(id INTEGER PRIMARY KEY AUTOINCREMENT, car_number);`
    )
})


app.post('/create-db-b', () => {
    db.run(
      `CREATE TABLE bNum(id INTEGER PRIMARY KEY AUTOINCREMENT, car_number);`
    )
})



app.delete('/delete-db-b', () => {
  db.run(
    `DROP TABLE bNum;`
  )
})

// delFunction
app.delete('/wNum/:car_number', (req, res) => {
  
  const {car_number} = req.params

  const sql = `DELETE FROM wNum WHERE car_number = ?`
  db.run(sql, [car_number], (error) => {
    if (error) return console.error(error);
    res.send({ message: 'Deleted' })
  })
})
// delFunction


app.get('/wNum', (req, res) => {
  const sql = `SELECT * FROM wNum`
  db.all(sql, [], (error, rows) => {
    if (error) return console.error(error);
    res.send({ wNum: rows })
  })
})


app.get('/bNum', (req, res) => {
  const sql = `SELECT * FROM bNum`
  db.all(sql, [], (error, rows) => {
    if (error) return console.error(error);
    res.send({ bNum: rows })
  })
})


app.post('/wNum', (req, res) => {
  const { carNumber } = req.body;
  const sql = `INSERT INTO wNum(car_number) VALUES(?)`
  db.run(sql, [carNumber], (error) => {
    if (error) return console.error(error);
    res.send({ message: 'ok' })
  })
})


app.post('/bNum', (req, res) => {
    const {carNumber} = req.body;
    const sql = `INSERT INTO bNum(car_number) VALUES(?)`
  db.run(sql, [ carNumber], (error) => {
    if (error) return console.error(error);
    res.send({message: 'ok'})
  })
})


app.listen(5000, () => {
    console.log(`Наш порт http://127.0.0.1:5000`)
})

module.exports = app

