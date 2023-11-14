import { Router } from 'express'

import {
    getIssues, getIssue,
    createIssue, updateIssue,
    deleteIssue, addNote, addManagement
} from '../controllers/issuesController.js'

const router = Router()

router.get('/', getIssues)
router.get('/:id', getIssue)
router.post('/', createIssue)
router.post('/:id/addNote', addNote)
router.post('/:id/addManagement', addManagement)
router.put('/:id', updateIssue)
router.delete('/:id', deleteIssue)

export default router