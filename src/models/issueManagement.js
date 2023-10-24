import mongoose from 'mongoose'

const issueManagementSchema = new mongoose.Schema({
    responsible: {
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
    description: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    usedObjects : {
        type: String,
        trim: true
    }
})

const IssueManagement = mongoose.model('IssueManagement', issueManagementSchema)

export default IssueManagement