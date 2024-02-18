const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: String,
});

module.exports = mongoose.model('Book', BookSchema);