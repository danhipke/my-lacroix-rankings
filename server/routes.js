const express = require('express')
const router = express.Router()

const db = require('./queries')

router.get('/api/users/:id', db.getUser)
router.post('/api/users', db.createUser)
router.get('/api/rankings/:userId', db.getRankings)
router.post('/api/rankings', db.createRankings)
router.put('/api/rankings', db.updateRankings)
router.get('/api/flavors', db.getFlavors)

module.exports = router
