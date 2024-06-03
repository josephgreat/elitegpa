const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course: {type: String,},
    course_code: {type: String},
    credit_load: {type: String, },
    grade: {type: String,}
});

const semesterSchema = new mongoose.Schema({
    semester: {type: Number, required: true, max:2, min:1},
    courses: [courseSchema],
    gpa: {type: String,},
});

const levelSchema = new mongoose.Schema({
    semesters: [semesterSchema],
    level: {type: String, required: true},
    session: {type: String},
    uid: {type: String, required: true}
});

// const gpaSchema = new mongoose.Schema({
//     levels: [levelSchema]
// });

const LevelModel = mongoose.model('Gpa', levelSchema);

module.exports = LevelModel;