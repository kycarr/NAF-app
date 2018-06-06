var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructorSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    class_id: {
        type: [],
    }

});


InstructorSchema.pre('save', function(next) {
    if(!this.isNew) return next();
    else
        next();
})

// InstructorSchema.update()

var Instructor = mongoose.model('Instructors', InstructorSchema);

module.exports = Instructor;