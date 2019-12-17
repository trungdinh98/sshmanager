const controllers = {}
var sequelize = require('../model/database');
var Users = require('../../../models/user');

controllers.listUser = async (req, res) => {
  const response = await sequelize.sync().then(function () {
    const data = Users.findAll();
    return data;
  })
    .catch(error => {
      return error;
    });
  res.json({ data: response });
}
sequelize.sync()

controllers.update = async (req, res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const { username, password, age, phone, project, profile } = req.body;
  // Update data
  const data = await Users.update({
    username: username,
    password: password,
    age: age,
    phone: phone,
    project: project,
    profile: profile
  },
    {
      where: { id: id }
    })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    })
  res.json({ success: true, data: data, message: "Updated successful" });
}

controllers.delete = async (req, res) => {
  const { id } = req.body;
  const del = await Users.destroy({
    where: { id: id }
  })
  res.json({ deleted: del });
}

controllers.updateID = async (req, res) => {
  const { id } = req.body;
  const data = await Users.update({
    id: id - 1
  }, {
    where: { id: id }
  })
    .then(function (data) {
      return data;
    })
    .catch(error => {
      return error;
    })
  res.json({ success:true, data: data });
}

controllers.add = async (req, res) => {
  const {username, password, phone, age, project} = req.body;
  const data = await Users.create({
    username:username,
    password:password,
    project:project,
    profile:"https://image.flaticon.com/icons/svg/145/145867.svg",
    age:age,
    phone:phone
  }).then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Error "+error)
    return error;
  })
  res.json({success:true, data:data});
}
module.exports = controllers;