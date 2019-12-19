const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Models = require('../models');
var mysql = require('mysql');
router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_created_at: today
  }

  Models.user.findOne({
    where: {
      user_email: req.body.user_email
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.user_password, 10, (err, hash) => {
          userData.user_password = hash
          Models.user.create(userData)
            .then(user => {
              res.json({ status: user.user_email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

router.post('/login', (req, res) => {
  Models.user.findOne({
    where: {
      user_email: req.body.user_email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.user_password, user.user_password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      } else {
        res.status(400).json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(400).json({ error: err })
    })
})

router.get('/', (req, res) => {
  //   Models.user.findAll({
  //     attributes: { include: [[Sequelize.fn("COUNT", Sequelize.col("project_users.project_id")), "Projects"]] 
  //   },
  //   include: [{
  //       model: Models.project_user, attributes: []
  //   }],
  //   group: ['users.user_id']
  //   }).then(response => {
  //     res.json({data: response})
  // })
  var con = mysql.createConnection({
    host: "172.10.10.10",
    user: "root",
    password: "mypasswd",
    database: "mydb"
  });
  const SELECT_ALL_QUERY = `select u.user_id, user_email, user_password, user_firstname, user_lastname, (select count(project_id) from project_users pu where pu.user_id = u.user_id) as countPJ from users u inner join project_users pu on pu.user_id = u.user_id group by u.user_id`
  con.connect(function (err) {
    if (err) return err;
    con.query(SELECT_ALL_QUERY, function (err, result) {
      if (err) return err;
      res.json({ data: result })
    });
  })
})

router.post('/update/:user_id',(req, res) => {
  const { user_id } = req.params;
  const { user_email, user_firstname, user_lastname, user_password, user_countPJ } = req.body;

  const data = Models.user.update({
    user_email: user_email,
    user_firstname: user_firstname,
    user_lastname: user_lastname,
    user_password: user_password,
    user_countPJ: user_countPJ
  },
    {
      where: { user_id: user_id }
    })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    })
    console.log(data)
  res.json({ success: true, data: data, message: "Updated successful" });
})

module.exports = router;
