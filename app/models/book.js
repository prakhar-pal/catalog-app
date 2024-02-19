import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    title: String,
});

export default mongoose.model('Book', BookSchema);
