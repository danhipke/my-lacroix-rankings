const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

const getUser = (req, res, next) => {
  const userId = req.params.id
  db.oneOrNone('SELECT * FROM users WHERE id = $1', userId)
    .then((data) => {
      if (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved user'
          })
      } else {
        res.status(404)
          .json({
            status: 'error',
            message: 'User ' + userId + ' not found'
          })
      }
    })
    .catch((err) =>
      next(err)
    )
}

// TODO: How to handle duplicate user ids? (rare)
const createUser = (req, res, next) => {
  const userId = req.body.id
  db.none('INSERT INTO users(id) values($1)', userId)
    .then((data) => {
      res.status(201)
        .json({
          status: 'success',
          userId: userId,
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
  let flavors = req.body.flavors.map((flavor) => (
    {
      user_id: userId,
      flavor_id: flavor.id,
      rank: flavor.rank
    })
  )
  let query = pgp.helpers.insert(flavors, createRankingsCs)

  db.none(query)
    .then((data) => {
      res.status(201)
        .json({
          status: 'success',
          message: 'Successfully inserted all flavor rankings'
        })
    })
    .catch(err =>
      next(err)
    )
}

const updateRankingsCs = new pgp.helpers.ColumnSet(['?user_id', '?flavor_id', 'rank'], { table: 'rankings' })
const updateRankings = (req, res, next) => {
  const userId = req.body.userId
  let flavors = req.body.flavors.map((flavor) => (
    {
      user_id: userId,
      flavor_id: flavor.id,
      rank: flavor.rank
    })
  )
  let query = pgp.helpers.update(flavors, updateRankingsCs) +
  ' WHERE v.user_id = t.user_id AND v.flavor_id = t.flavor_id'

  db.none(query)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Successfully updated all flavor rankings'
        })
    })
    .catch(err =>
      next(err)
    )
}

const getRankings = (req, res, next) => {
  const userId = req.params.userId
  db.any('SELECT rankings.rank, flavors.name, flavors.id, flavors.image_src ' +
  'FROM rankings ' +
  'LEFT OUTER JOIN flavors ON rankings.flavor_id = flavors.id ' +
  'WHERE rankings.user_id = $1', userId)
    .then((data) => {
      if (data.length > 0) {
        res.status(200)
          .json({
            status: 'success',
            flavors: data,
            message: 'Retrieved all flavor rankings for user ' + userId
          })
      } else {
        res.status(404)
          .json({
            status: 'error',
            message: 'No rankings found for user ' + userId
          })
      }
    })
    .catch(err =>
      next(err)
    )
}

const getFlavors = (req, res, next) => {
  db.many('SELECT * FROM flavors')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          flavors: data,
          message: 'Retrieved all flavors'
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
  createUser: createUser,
  getFlavors: getFlavors
}
