const debug = require('debug')('app:bin:bootstrap')

const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

const insertFlavorsCs = new pgp.helpers.ColumnSet(['id', 'name', 'image_src', 'default_rank'], { table: 'flavors' })
let defaultFlavors = [
  {
    id: 'apricot',
    default_rank: 1,
    name: 'Apricot',
    image_src: '/images/apricot.png'
  },
  {
    id: 'berry',
    name: 'Berry',
    default_rank: 2,
    image_src: '/images/berry.png'
  },
  {
    id: 'cerise-limon',
    name: 'Cerise Limón',
    default_rank: 3,
    image_src: '/images/cerise-limon.png'
  },
  {
    id: 'coconut',
    name: 'Coconut',
    default_rank: 4,
    image_src: '/images/coconut.png'
  },
  {
    id: 'cran-raspberry',
    name: 'Cran-Raspberry',
    default_rank: 5,
    image_src: '/images/cran-raspberry.png'
  },
  {
    id: 'kiwi-sandia',
    name: 'Kiwi Sandía',
    default_rank: 6,
    image_src: '/images/kiwi-sandia.png'
  },
  {
    id: 'lacola',
    name: 'LaCola',
    default_rank: 7,
    image_src: '/images/lacola.png'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    default_rank: 8,
    image_src: '/images/lemon.png'
  },
  {
    id: 'lime',
    name: 'Lime',
    default_rank: 9,
    image_src: '/images/lime.png'
  },
  {
    id: 'mango',
    name: 'Mango',
    default_rank: 10,
    image_src: '/images/mango.png'
  },
  {
    id: 'melon-pomelo',
    name: 'Melón Pomelo',
    default_rank: 11,
    image_src: '/images/melon-pomelo.png'
  },
  {
    id: 'mure-pepino',
    name: 'Muré Pepino',
    default_rank: 12,
    image_src: '/images/mure-pepino.png'
  },
  {
    id: 'orange',
    name: 'Orange',
    default_rank: 13,
    image_src: '/images/orange.png'
  },
  {
    id: 'pamplemousse',
    name: 'Pamplemousse',
    default_rank: 14,
    image_src: '/images/pamplemousse.png'
  },
  {
    id: 'passionfruit',
    name: 'Passionfruit',
    default_rank: 15,
    image_src: '/images/passionfruit.png'
  },
  {
    id: 'peach-pear',
    name: 'Peach Pear',
    default_rank: 16,
    image_src: '/images/peach-pear.png'
  },
  {
    id: 'pina-fraise',
    name: 'Piña Fraise',
    default_rank: 17,
    image_src: '/images/pina-fraise.png'
  },
  {
    id: 'pomme-baya',
    name: 'Pomme Bayá',
    default_rank: 18,
    image_src: '/images/pomme-baya.png'
  },
  {
    id: 'pure',
    name: 'Pure',
    default_rank: 19,
    image_src: '/images/pure.png'
  },
  {
    id: 'tangerine',
    name: 'Tangerine',
    default_rank: 20,
    image_src: '/images/tangerine.png'
  }
]
let insertFlavorsQuery = pgp.helpers.insert(defaultFlavors, insertFlavorsCs)

db.tx(t => {
  let queries = [
    // Clear out preexisting tables
    t.none('DROP TABLE IF EXISTS users, rankings, flavors;'),

    // Create users table
    t.none('CREATE TABLE users(id TEXT NOT NULL, ' +
    'primary key (id));'),

    // Create flavors table
    t.none('CREATE TABLE flavors(id TEXT NOT NULL, ' +
    'name TEXT NOT NULL, ' +
    'image_src TEXT NOT NULL, ' +
    'default_rank INTEGER NOT NULL, ' +
    'primary key (id));'),

    // Create rankings table
    t.none('CREATE TABLE rankings(user_id TEXT NOT NULL REFERENCES users(id), ' +
    'flavor_id TEXT NOT NULL REFERENCES flavors(id), ' +
    'rank INTEGER NOT NULL, ' +
    'primary key (user_id,flavor_id));'),

    // Insert flavors into DB table
    t.none(insertFlavorsQuery)
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
