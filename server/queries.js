const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

const getUser = (req, res, next) => {
  const userId = req.params.id
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

const createUser = (req, res, next) => {
  const userId = req.body.id
  db.none('INSERT INTO users(id) values($1)', userId)
    .then((data) => {
      res.status(201)
        .json({
          status: 'success',
          data: data,
          message: 'Created user'
        })
    })
    .catch((err) =>
      next(err)
    )
}

const createRankingsCs = new pgp.helpers.ColumnSet(['user_id', 'flavor_id', 'rank'], { table: 'rankings' })
const createRankings = (req, res, next) => {
  const userId = req.body.userId
  let rankings = req.body.rankings.map((ranking) => (
    {
      user_id: userId,
      flavor_id: ranking.id,
      rank: ranking.rank
    })
  )
  let query = pgp.helpers.insert(rankings, createRankingsCs)

  db.none(query)
    .then((data) => {
      res.status(201)
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
      flavor_id: ranking.id,
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
  const userId = req.params.userId
  db.many('SELECT * FROM rankings WHERE user_id = $1', userId)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          rankings: data,
          message: 'Retrieved all puppies for user Id ' + userId
        })
    })
    .catch(err =>
      next(err)
    )
}

module.exports = {
  getUser: getUser,
  createRankings: createRankings,
  updateRankings: updateRankings,
  getRankings: getRankings,
  createUser: createUser
}
