const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer')
const port = process.env.PORT || 8000;
require('dotenv').config();
// const databaseUrl = ;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
const HostelSchema = new mongoose.Schema({
    Student_Name: { type: String, required: true },
    Student_Year: { type: String, required: true },
    Batch_Year: { type: String, required: true },
    Student_Phone: { type: Number, required: true },
    Student_Address: { type: String, required: true },
    Nationality: { type: String, required: true },
    Date_of_birth: { type: String, required: true },
    Age: { type: Number, required: true },
    Blood_Group: { type: String, required: true },
    Parent_Name: { type: String, required: true },
    Parent_Number: { type: Number, required: true },
    Guardian_Name: { type: String, required: true },
    Guradian_Address: { type: String, required: true },
    Category: { type: String, required: true },
    qualification: { type: Array, required: true }
})
const HostelModel = new mongoose.model('HostelAdmission', HostelSchema)


const upload = multer()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.post('/submitted',(req, res) => {
    const formData = req.body
    const newAdmission = new HostelModel({
        Student_Name: formData.Student_Name,
        Student_Year: formData.Study_year,
        Batch_Year: `${formData.batchYearFrom} - ${formData.batchYearTo}`,
        Student_Phone: formData.StudentPhone,
        Student_Address: formData.StudentAddress,
        Nationality: formData.Nationality,
        Date_of_birth: formData.DOB,
        Age: formData.Age,
        Blood_Group: formData.blood_group,
        Parent_Name: formData.parent_name,
        Parent_Number: formData.parent_number,
        Guardian_Name: formData.guardian_name,
        Guradian_Address: formData.guardian_address,
        Category: formData.category,
        qualification: [
            { 'Qualification': formData.qualification_1 || '', 'Marks Obtained': formData.marks_obt_1 || '', 'Percentage': formData.percentage_1 || '', 'result': formData.result_1 || ''},
            { 'Qualification': formData.qualification_2 || '', 'Marks Obtained': formData.marks_obt_2 || '', 'Percentage': formData.percentage_2 || '', 'result': formData.result_2 || ''},
            { 'Qualification': formData.qualification_3 || '', 'Marks Obtained': formData.marks_obt_3 || '', 'Percentage': formData.percentage_3 || '', 'result': formData.result_3 || ''}]
    })

    newAdmission.save()
        .then((savedUser) => {
            console.log('User saved:', savedUser);
            // Do other operations or send a response as needed
        })
        .catch((err) => {
            console.error('Error saving user:', err.message);
        });
        res.redirect('https://www.gpsakoli.ac.in/')
})
app.listen(port, 'localhost', () => {
    console.log('Your App is running at port : ', port);
})