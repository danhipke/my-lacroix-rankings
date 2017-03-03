const debug = require('debug')('app:queries')
const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

const getUser = (req, res, next) => {
  const userId = parseInt(req.params.id)
  db.one('SELECT * FROM users WHERE id = $1', userId)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved user'
        })
    })
    .catch((err) =>
      next(err)
    )
}

const insertRankingsCs = new pgp.helpers.ColumnSet(['user_id', 'flavor_id', 'rank'], { table: 'rankings' })
const insertRankings = (req, res, next) => {
  const userId = req.body.userId
  let rankings = req.body.rankings.map((ranking) => (
    {
      user_id: userId,
      flavor_id: ranking.flavor,
      rank: ranking.rank
    })
  )
  let query = pgp.helpers.insert(rankings, insertRankingsCs)

  db.none(query)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Successfully inserted all rankings'
        })
    })
    .catch(err =>
      next(err)
    )
}

const updateRankingsCs = new pgp.helpers.ColumnSet(['?user_id', '?flavor_id', 'rank'], { table: 'rankings' })
const updateRankings = (req, res, next) => {
  const userId = req.body.userId
  let rankings = req.body.rankings.map((ranking) => (
    {
      user_id: userId,
      flavor_id: ranking.flavor,
      rank: ranking.rank
    })
  )
  let query = pgp.helpers.update(rankings, updateRankingsCs) +
  ' WHERE v.user_id = t.user_id AND v.flavor_id = t.flavor_id'

  db.none(query)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Successfully updated all rankings'
        })
    })
    .catch(err =>
      next(err)
    )
}

const getRankings = (req, res, next) => {
  const userId = parseInt(req.params.userId)
  db.any('SELECT * FROM rankings WHERE user_id = $1', userId)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all puppies for user Id ' + userId
        })
    })
    .catch(err =>
      next(err)
    )
}

module.exports = {
  getUser: getUser,
  insertRankings: insertRankings,
  updateRankings: updateRankings,
  getRankings: getRankings
}
