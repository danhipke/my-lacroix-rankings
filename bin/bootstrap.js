const debug = require('debug')('app:bin:bootstrap')

const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

db.tx(t => {
  let queries = [
    // Clear out preexisting tables
    t.none('DROP TABLE IF EXISTS users;'),
    t.none('DROP TABLE IF EXISTS rankings;'),
    // Create users table
    t.none('CREATE TABLE users(id SERIAL NOT NULL, ' +
    'name TEXT NOT NULL, ' +
    'primary key (id));'),
    // Create rankings table
    t.none('CREATE TABLE rankings(user_id INTEGER NOT NULL, ' +
    'flavor_id TEXT NOT NULL, ' +
    'rank INTEGER NOT NULL, ' +
    'primary key (user_id,flavor_id));')
  ]
  for (var i = 1; i <= 10; i++) {
    queries.push(t.none('INSERT INTO users(name) VALUES($1)', 'name-' + i))
  }
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
