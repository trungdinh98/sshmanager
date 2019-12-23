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

//hiển thị toàn bộ nhân viên công ty
router.get('/', (req, res) => {
  var con = mysql.createConnection({
    host: "172.10.10.10",
    user: "root",
    password: "mypasswd",
    database: "mydb"
  });
  const SELECT_ALL_QUERY = `select u.user_id, user_email, user_created_at, user_firstname, user_lastname, (select count(project_id) from projectUsers pu where pu.user_id = u.user_id) as countPJ from users u inner join projectUsers pu on pu.user_id = u.user_id group by u.user_id`
  con.connect(function (err) {
    if (err) return err;
    con.query(SELECT_ALL_QUERY, function (err, result) {
      if (err) return err;
      res.json({ data: result })
    });
  })
})

//cập nhật thông tin sửa đổi của 1 nhân viên
router.post('/update/:user_id', (req, res) => {
  const { user_id } = req.params;
  const { user_email, user_firstname, user_lastname, user_countPJ } = req.body;

  const data = Models.user.update({
    user_email: user_email,
    user_firstname: user_firstname,
    user_lastname: user_lastname,
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
  res.json({ success: true, data: data });
})

//hiên thị nhân viên có trong 1 project
router.get('/projectUsers/:project_id', (req, res) => {
  var con = mysql.createConnection({
    host: "172.10.10.10",
    user: "root",
    password: "mypasswd",
    database: "mydb"
  });
  const { project_id } = req.params;
  const SELECT_QUERY = `select * from users u inner join projectUsers pu on u.user_id = pu.user_id where pu.project_id = ${project_id}`
  con.connect(function (err) {
    if (err) return err;
    con.query(SELECT_QUERY, function (err, result) {
      if (err) return err;
      res.json({ data: result })
    });
  })
})

//xóa nhân viên khỏi 1 project
router.post('/deleteFromPJ', (req, res) => {
  const { user_id, project_id } = req.body;
  var con = mysql.createConnection({
    host: "172.10.10.10",
    user: "root",
    password: "mypasswd",
    database: "mydb"
  });
  console.log(user_id, project_id)
  const DELETE_QUERY = `delete from projectUsers where project_id = ${project_id} && user_id = ${user_id}`
  con.connect(function(err){
    if(err) return err;
    con.query(DELETE_QUERY, function (err, result){
      if(err) return err;
      res.json({success: true, data: result})
    })
  })
})

//kiểm tra email nhập vào có là nhân viên không
router.post('/checkuser', (req, res) => {
  const { user_email } = req.body;
  Models.user.findOne({
    where: { user_email: user_email }
  }).then(user => {
    if (user === null) {
      res.json({ success: false })
    } else {
      res.json({ success: true, data: user.user_id })
    }
  }).catch(error => {
    return error;
  })
})

//thêm 1 nhân viên mới vào project
router.post('/addToPJ', async (req, res) => {
  const { project_id, user_id } = req.body;
  var con = mysql.createConnection({
    host: "172.10.10.10",
    user: "root",
    password: "mypasswd",
    database: "mydb"
  });
  const SELECT_QUERY = `select * from projectUsers pu where pu.project_id = ${project_id} && pu.user_id = ${user_id}`
  con.connect(function (err) {
    if (err) return err;
    con.query(SELECT_QUERY, function (err, result) {
      if(err) return err;
      if(result.length === 0){
        const INSERT_QUERY = `insert into projectUsers(project_id,user_id,is_admin) values (${project_id}, ${user_id}, 0)`
        con.query(INSERT_QUERY, function(err, result) {
          if(err) return err;
          res.json({success: true, data: result})
        })
      } else {
        res.json({success: false})
      }
    });
  })
})

//kiểm tra xem người dùng có là admin của Project hay không
router.post('/isAdmin', (req, res) => {
  const {project_id, authen_id} = req.body;
  var con = mysql.createConnection({
    host: "172.10.10.10",
    user: "root",
    password: "mypasswd",
    database: "mydb"
  });
  const SELECT_QUERY = `select is_admin from projectUsers where project_id = ${project_id} && user_id = ${authen_id}`
  con.connect(function(err){
    if(err) return err;
    con.query(SELECT_QUERY, function (err, result){
      if(err) return err;
      res.json(result)
    })
  })
})
module.exports = router;
