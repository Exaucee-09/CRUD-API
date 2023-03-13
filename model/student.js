const mongoose=require("mongoose")

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    class: String,
  });
  
  // Create a Mongoose model based on the schema
  const Student = mongoose.model('Student', studentSchema);




module.exports=Student;  