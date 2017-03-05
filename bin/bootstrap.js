const debug = require('debug')('app:bin:bootstrap')

const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

// TODO: Initialize database with flavors table with flavor info
db.tx(t => {
  let queries = [
    // Clear out preexisting tables
    t.none('DROP TABLE IF EXISTS users;'),
    t.none('DROP TABLE IF EXISTS rankings;'),
    // Create users table
    t.none('CREATE TABLE users(id TEXT NOT NULL, ' +
    'primary key (id));'),
    // Create rankings table
    t.none('CREATE TABLE rankings(user_id TEXT NOT NULL, ' +
    'flavor_id TEXT NOT NULL, ' +
    'rank INTEGER NOT NULL, ' +
    'primary key (user_id,flavor_id));')
  ]
  return t.batch(queries)
})
.then(data => {
  debug('Successfully bootstrapped database!')
  process.exit(0)
})
.catch(error => {
  debug(error)
  debug('Error bootstrapping the database. Make sure database exists by running ' +
  'sql/init.sql')
  process.exit(1)
})
