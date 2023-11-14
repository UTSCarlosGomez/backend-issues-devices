import mongoose from 'mongoose'

const issueSchema = new mongoose.Schema({
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
  device: {
    id: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true
    }
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  deviceStatus: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notes: [{
    content: {
      type: String,
      required: true,
      trim: true
    },
    creatorName: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  issuesManagement: [
    {
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
      usedObjects: {
        type: String
      }
    }
  ]
}, { versionKey: false })

const Issue = mongoose.model('Issue', issueSchema)

export default Issue
