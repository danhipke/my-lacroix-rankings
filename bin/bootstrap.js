const debug = require('debug')('app:bin:bootstrap')

const options = {
  // Initialization Options
}

const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/my_lacroix_rankings_app'
const db = pgp(connectionString)

const insertFlavorsCs = new pgp.helpers.ColumnSet(['id', 'name', 'image_src',
  'default_rank', 'color'], { table: 'flavors' })
let defaultFlavors = [
  {
    id: 'apricot',
    default_rank: 1,
    name: 'Apricot',
    image_src: '/images/apricot.png',
    color: '#F1F0F3'
  },
  {
    id: 'berry',
    name: 'Berry',
    default_rank: 2,
    image_src: '/images/berry.png',
    color: '#A970AB'
  },
  {
    id: 'cerise-limon',
    name: 'Cerise Limón',
    default_rank: 3,
    image_src: '/images/cerise-limon.png',
    color: '#BD4244'
  },
  {
    id: 'coconut',
    name: 'Coconut',
    default_rank: 4,
    image_src: '/images/coconut.png',
    color: '#AC7657'
  },
  {
    id: 'cran-raspberry',
    name: 'Cran-Raspberry',
    default_rank: 5,
    image_src: '/images/cran-raspberry.png',
    color: '#F1C6CF'
  },
  {
    id: 'kiwi-sandia',
    name: 'Kiwi Sandía',
    default_rank: 6,
    image_src: '/images/kiwi-sandia.png',
    color: '#A3A76D'
  },
  {
    id: 'lacola',
    name: 'LaCola',
    default_rank: 7,
    image_src: '/images/lacola.png',
    color: '#6282BB'
  },
  {
    id: 'lemon',
    name: 'Lemon',
    default_rank: 8,
    image_src: '/images/lemon.png',
    color: '#CCB641'
  },
  {
    id: 'lime',
    name: 'Lime',
    default_rank: 9,
    image_src: '/images/lime.png',
    color: '#63AD7E'
  },
  {
    id: 'mango',
    name: 'Mango',
    default_rank: 10,
    image_src: '/images/mango.png',
    color: '#A3D452'
  },
  {
    id: 'melon-pomelo',
    name: 'Melón Pomelo',
    default_rank: 11,
    image_src: '/images/melon-pomelo.png',
    color: '#DA9468'
  },
  {
    id: 'mure-pepino',
    name: 'Muré Pepino',
    default_rank: 12,
    image_src: '/images/mure-pepino.png',
    color: '#C4A5C4'
  },
  {
    id: 'orange',
    name: 'Orange',
    default_rank: 13,
    image_src: '/images/orange.png',
    color: '#E6B342'
  },
  {
    id: 'pamplemousse',
    name: 'Pamplemousse',
    default_rank: 14,
    image_src: '/images/pamplemousse.png',
    color: '#E1BB84'
  },
  {
    id: 'passionfruit',
    name: 'Passionfruit',
    default_rank: 15,
    image_src: '/images/passionfruit.png',
    color: '#E76F8D'
  },
  {
    id: 'peach-pear',
    name: 'Peach Pear',
    default_rank: 16,
    image_src: '/images/peach-pear.png',
    color: '#DBC8A2'
  },
  {
    id: 'pina-fraise',
    name: 'Piña Fraise',
    default_rank: 17,
    image_src: '/images/pina-fraise.png',
    color: '#D6D486'
  },
  {
    id: 'pomme-baya',
    name: 'Pomme Bayá',
    default_rank: 18,
    image_src: '/images/pomme-baya.png',
    color: '#D1BB46'
  },
  {
    id: 'pure',
    name: 'Pure',
    default_rank: 19,
    image_src: '/images/pure.png',
    color: '#58ACCA'
  },
  {
    id: 'tangerine',
    name: 'Tangerine',
    default_rank: 20,
    image_src: '/images/tangerine.png',
    color: '#DB9D39'
  }
]

db.tx(t => {
  let insertFlavorsQuery = pgp.helpers.insert(defaultFlavors, insertFlavorsCs)
  
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
    'color varchar(7) NOT NULL, ' +
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
  pgp.end(); // shutting down the connection pool, so the process exits normally
})
.catch(error => {
  debug(error)
  debug('Error bootstrapping the database. Make sure database exists by running ' +
  'sql/init.sql')
  process.exit(1)
})
