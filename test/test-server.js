var nexridge = require('../nexridge')

nexridge.connect({
  client: 'mariasql',
  connection: {
    host     : '127.0.0.1',
    user     : 'travis',
    password : '',
    database : 'test_db'
  }
})
nexridge.listen(8197)