const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Models = require('../models');
router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_user_email: req.body.user_email,
    user_user_password: req.body.user_password,
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

module.exports = router;
