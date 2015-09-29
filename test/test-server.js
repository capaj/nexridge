var nexridge = require('../nexridge')

nexridge.connect({
  client: 'mysql2',
  connection: {
    host     : '127.0.0.1',
    user     : 'travis',
    password : '',
    database : 'test_db'
  }
})
nexridge.listen(8197)