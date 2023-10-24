import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    content: {
        type:String,
        required: true,
        trim: true
    },
    creator: {
        id: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model('Note', noteSchema)

export default Note