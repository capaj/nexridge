var nexridge = require('../nexridge')

nexridge.connect({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'travis',
    password: '',
    database: 'nexridge_test'
  }
})

nexridge.listen(8197)
