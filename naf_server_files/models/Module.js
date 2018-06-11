import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({

    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    },

    moduleName: {
    	type: String
    }

});

const Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;