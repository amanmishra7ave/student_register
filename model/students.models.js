const mongoose=require('mongoose')

const Register_students_shema=new mongoose.Schema({
    Snumber:{
        type:Number,
        required:[true,'S no is required'], 
    },
    Student_name:{
        type:String,
        required:[true,'Student name is required'],
    },
    Date_of_birth:{
        type:Date,
        required:[true,'Enter date of birth'],
    },
    Father_name:{
        type:String,
        required:[true,'Enter the father names'],
    },
    Gender:{
        type:String,
        enum:['Male','Female','Other'],
    },
    Address:{
        type:String,
        required:[true,'Enter Address'],
    },
    Contact_number:{
        type:Number,
        required:[true,'Enter contact number'],
        validate:{
            validator:function(v) {
                return /^\d{10}$/.test(v);
            },
            message:props=>`${props.value} is not a valid phone number! Must be 10 digits.`,
        },
        unique:true,
    },
},
{
    timestamps:true,
}
)

const Register_student=mongoose.model('Student_register',Register_students_shema);

module.exports=Register_student;