const express=require("express");
const router=express.Router();

const {
    students_register,
    getAllStudents
}=require("../controllers/register_students");

router.route('/register_students').post(students_register);
router.route('/getStudentInfo').get(getAllStudents);

module.exports=router;