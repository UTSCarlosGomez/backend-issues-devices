import Device from '../models/Device.js'
import Issue from '../models/issue.js'
import User from '../models/User.js'

const createIssue = async (req, res) => {
  const issueData = req.body

  try {
    const user = await User.findById(issueData.creatorId).exec()
    const device = await Device.findById(issueData.deviceId).exec()

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

const deleteIssue = async (req, res) => {
  const { id } = req.params

  try {
    const issue = Issue.findById(id)

    if (issue) {
      await issue.remove()

      res.json({ message: 'Issue removed' })
    }

    res.status(404).json({ message: 'Issue not found' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const addNote = async (req, res) => {
  const { id } = req.params
  const noteData = req.body

  try {
    const issue = await Issue.findById(id).exec()

    if (issue) {
      issue.notes.push({
        content: noteData.content,
        creatorName: noteData.creatorName
      })

      await issue.save()

      return res.json(issue)
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const addManagement = async (req, res) => {
  const { id } = req.params
  const managementData = req.body

  try {
    const issue = await Issue.findById(id).exec()

    if (issue) {
      issue.issuesManagement.push({
        responsible: {
          id: managementData.responsibleId,
          name: managementData.responsibleName
        },
        description: managementData.description,
        startDate: managementData.startDate,
        endDate: managementData.endDate,
        usedObjects: managementData.usedObjects
      })

      issue.status = managementData.status

      await issue.save()

      return res.json(issue)
    }

    return res.status(404).json({ message: 'Issue not found' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue,
  addNote,
  addManagement
}