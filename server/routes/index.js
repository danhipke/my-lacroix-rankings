const express = require('express')
const router = express.Router()

const db = require('../queries')

router.get('/api/users/:id', db.getUser)
router.get('/api/rankings/:userId', db.getRankings)
router.post('/api/rankings', db.insertRankings)
router.put('/api/rankings', db.updateRankings)

module.exports = router
