const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const Student = require('../model/students.models'); // Corrected the filename from students.models to students.model
// const db = require('../config/dbConnection');

const app = express();
app.use(bodyParser.json());

const students_register = asyncHandler(async (req, res, next) => {
    const {
        Snumber,
        Student_name,
        Date_of_birth,
        Father_name,
        Gender,
        Address,
        Contact_number
    } = req.body;

    if (!Snumber || !Student_name || !Date_of_birth || !Father_name || !Gender || !Address || !Contact_number) {
        return res.status(400).json({ error: `All fields are required` });
    }

    try {
        const student = new Student({
            Snumber,
            Student_name,
            Date_of_birth,
            Father_name,
            Gender,
            Address,
            Contact_number
        });
        const studentDoc = await student.save();
        res.status(201).json(studentDoc);
    } catch (error) {
        if (error.name == 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: 'Validation failed', message: errorMessages });
        } else {
            return res.status(500).json({ error: 'Internal server error', message: error.message });
        }
    }
});

const getAllStudents = asyncHandler(async (req, res, next) => {
    try {
        const students = await Student.find(); // Retrieve all documents from the students collection
        res.status(200).json(students); // Send the retrieved students as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
});

module.exports = {
    students_register,
    getAllStudents,
};


// const express = require('express');
// const bodyParser = require('body-parser');
// const asyncHandler = require('express-async-handler');
// const Student = require('../model/students.models'); // Renamed from Student_model to Student
// const db = require('../config/dbConnection');

// const app = express();
// app.use(bodyParser.json());

// const students_register = asyncHandler(async (req, res, next) => {
//     const {
//         Snumber,
//         Student_name,
//         Date_of_birth,
//         Father_name,
//         Gender,
//         Address,
//         Contact_number
//     } = req.body;

//     if (!Snumber || !Student_name || !Date_of_birth || !Father_name || !Gender || !Address || !Contact_number) {
//         return res.status(400).json({ error: `All fields are required` });
//     }

//     try {
//         const student = new Student({ // Changed students_register to Student
//             Snumber,
//             Student_name,
//             Date_of_birth,
//             Father_name,
//             Gender,
//             Address,
//             Contact_number
//         });
//         const studentDoc = await student.save(); // Await the save operation
//         res.status(201).json(studentDoc);
//     } catch (error) {
//         if (error.name == 'ValidationError') {
//             const errorMessages = Object.values(error.errors).map(err => err.message);
//             return res.status(400).json({ error: 'Validation failed', message: errorMessages });
//         } else {
//             return res.status(500).json({ error: 'Internal server error', message: error.message });
//         }
//     }
// });

// module.exports = {
//     students_register,
// };


// // const express=require('express');
// // const bodyParser=require('body-parser');
// // const asyncHandler=require('express-async-handler');
// // const Student_model=require('../model/students.model');
// // const db=require('../config/dbConnection');

// // const app=express();
// // app.use(bodyParser.json());

// // const students_register=asyncHandler(async (req,res,next)=>{
// //     const {
// //         Snumber,
// //         Student_name,
// //         Date_of_birth,
// //         Father_name,
// //         Gender,
// //         Address,
// //         Contact_number
// //     }=req.body;

// //     if(!Snumber || !Student_name || !Date_of_birth || !Father_name || !Gender || !Address || !Contact_number){
// //         return res.status(400).json({error:`All fields are required`});
// //     }

// //     try {
// //         const students=new students_register({
// //         Snumber,
// //         Student_name,
// //         Date_of_birth,
// //         Father_name,
// //         Gender,
// //         Address,
// //         Contact_number
// //         });
// //         const students_Doc=new students.save();
// //         res.status(201).json(students_Doc);
// //     } catch(error) 
// //     {
// //         if(error.name=='ValidationError') {
// //             const errorMessages=Object.values(error.errors).map(err=>err.message);
// //             return res.status(400).json({error:'Validation failed',message:errorMessages});
// //         }
// //     }
// // });

// // module.exports={
// //     students_register,
// // }