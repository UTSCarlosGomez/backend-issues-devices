import Device from '../models/Device.js'
import Issue from '../models/issue.js'
import User from '../models/User.js'

const createIssue = async (req, res) => {
    const issueData = req.body

    try {
        const user = User.findById(issueData.creatorId)
        const device = Device.findById(issueData.deviceId)
        
        const issue = new Issue({
            creator: {
                id: user._id,
                name: user.name
            },
            device: {
                id: device._id,
                code: device.code
            },
            type: issueData.type,
            description: issueData.description,
            deviceStatus: issueData.deviceStatus,
            status: issueData.status,
            notes: [],
            issuesManagement: []
        })

        await issue.save()

        res.status(201).json(issue)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getIssues = async (_, res) => {
    try {
        const issues = await Issue.find()

        res.json(issues)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getIssue = async (req, res) => {
    const { id } = req.params

    try {
        const issue = Issue.findById(id)

        if (!issue) return res.status(404).json({ message: 'Issue not found' })
        
        return res.json(issue)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateIssue = async (req, res) => {
    const { id } = req.params
    const issueData = req.body

    try {
        const issue = Issue.findById(id)

        if (issue) {
            issue.type = issueData.type
            issue.description = issueData.description
            issue.deviceStatus = issueData.deviceStatus
            issue.status = issueData.status

            await issue.save()

            res.json(issue)
        }

        return res.status(404).json({ message: 'Issue not found' })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}