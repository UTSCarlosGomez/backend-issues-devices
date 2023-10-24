import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://carandev:L4p60pQtzaNtGvLT@maincluster.0tmnqtq.mongodb.net/issues-devices?retryWrites=true&w=majority')

        console.log('MongoDB connected')
    } catch (err) {
        console.error(err.message)
    }
}