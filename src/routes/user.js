const express = require('express')
const userSchema = require('../models/user')
const router = express.Router()

//Create user
router.post('/CreateUser', (req, res) => {
    const user = userSchema(req.body)
    user
        .save()
        .then((data) => res.json({ "code" : 200, "message" : "Usuario creado correctamente"}))
        .catch((error) => res.json({ message: error}))
})

//Get all users
router.get('/GetAllUsers', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
})

//Get a user
router.get('/GetUser/:id', (req, res) => {
    const { id } = req.params
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}))
})

//Update a user
router.put('/UpdateUser/:id', (req, res) => {
    const { id } = req.params
    const { name, age, email } = req.body
    userSchema
        .updateOne({ _id : id }, { $set: {name, age, email} })
        .then((data) => res.json({ "code" : 200, "message" : "Usuario actualizado correctamente"}))
        .catch((error) => res.json({ message: error}))
})

//Delete a user
router.delete('/DeleteUser/:id', (req, res) => {
    const { id } = req.params
    userSchema
        .findByIdAndDelete({ _id : id })
        .then((data) => res.json({ "code" : 200, "message" : "Usuario eliminado correctamente"}))
        .catch((error) => res.json({ message: error}))
})



module.exports = router