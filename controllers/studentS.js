const Student = require("../model/student");
const routes = require("express").Router();
const methodOverride=require('method-override')
require('dotenv').config();

routes.use(methodOverride('_method'))

routes.get('/', async(req, res) => {
  try {
    // Retrieve all students from the database
    const students = await Student.find();
    res.render('home', { students });
  } catch (err) {
    console.log(err);
    res.send('Error retrieving students');
  }
});

// CREATE
routes.post('/create', async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      age: req.body.age,
      class: req.body.class
    });
    await student.save();
    // res.redirect('/app/');
    res.status(500).send(student)
  } catch (err) {
    console.log(err);
    res.send('Error creating student');
  }
});
// EDIT
routes.put('/edit/:id', async (req, res) => {
  try {
    // Find the student with the given ID and update it with the form data
    await Student.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      age: req.body.age,
      class: req.body.class
    });
    // Redirect back to the home page
    res.redirect('/app/');
  } catch (err) {
    console.log(err);
    res.send('Error updating student');
  }
});
routes.get('/edit/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render('edit', { student });
  } catch (err) {
    console.log(err);
    res.send('Error retrieving student');
  }
});
// DELETE
routes.delete('/delete/:id', async (req, res) => {
  try {
    await Student.findByIdAndRemove(req.params.id);
    res.redirect('/app/');
  } catch (err) {
    console.log(err);
    res.send('Error deleting student');
  }
});
module.exports = routes;