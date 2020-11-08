const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RowSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
 
var Rows = mongoose.model('Rows', RowSchema);

module.exports = Rows;