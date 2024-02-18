const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    title: {
        type: String,
        default: 'Mr.'
    },
    books: [{
        type: Schema.Types.ObjectId,
        refers: 'Book'
    }]
});

const Author = mongoose.model('Author', AuthorSchema);

Author.schema.virtual('name').get(function() {
    return this.firstName;
})

module.exports = Author;