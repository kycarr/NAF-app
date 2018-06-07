var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructorSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    class_names: [{
        type: String
    }]

});


InstructorSchema.pre('save', function(next) {
    if(!this.isNew) return next();
    else
        next();
})

// InstructorSchema.update()

var Instructor = mongoose.model('instructors', InstructorSchema);

module.exports = Instructor;