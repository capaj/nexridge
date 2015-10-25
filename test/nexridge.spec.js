'use strict'
/* global describe, it, before, after */
const mockery = require('mockery')
const expect = require('chai').expect

describe('nexridge', function () {
  let nexridge
  let queryHandler
  const fakeKnexInstance = {
    queryBuilder: () => {
      return Promise.resolve([1, 2, 3])
    }
  }
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    })
  })

  it('should create a server which listens on socket.io for any query', function (done) {
    let config = {
      client: 'mysql2',
      connection: {
        host: '127.0.0.1',
        user: 'travis',
        password: '',
        database: 'nexridge_test'
      }
    }

    mockery.registerMock('socket.io-rpc', (port, cb) => {
      return {expose: (obj) => {
        queryHandler = obj.nexridge.query
        cb()
      }}
    })
    mockery.registerMock('knex', (knexConf) => {
      expect(knexConf).to.equal(config)
      return fakeKnexInstance
    })

    nexridge = require('../nexridge')

    nexridge.connect(config)
    nexridge.listen(8197, done)
  })

  it('should pass query into knex return the results from executing knex query', function (done) {
    queryHandler({}).then((result) => {
      expect(result).to.eql([1, 2, 3])
      done()
    })
  })

  it('should reject with auth error when if such an error is thrown within authMiddleware', function () {

  })
  after(function () {
    mockery.disable()
  })
})
