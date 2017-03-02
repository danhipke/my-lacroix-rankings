const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

db.tx(t => {
  let queries = [
    t.none('DROP TABLE IF EXISTS users;'),
    t.none('CREATE TABLE users(id SERIAL NOT NULL, name TEXT NOT NULL)')
  ]
  for (var i = 1; i <= 10; i++) {
    queries.push(t.none('INSERT INTO users(name) VALUES($1)', 'name-' + i))
  }
  return t.batch(queries)
})
.then(data => {
  console.log(data)
})
.catch(error => {
  console.log(error)
})
