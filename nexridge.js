'use strict'
const RPC = require('socket.io-rpc')
const debug = require('debug')('nexridge:server')
const express = require('express')
const knex = require('knex')
const _ = require('lodash')
let db

module.exports = {
  listen: function listen() {
    var rpcApp = RPC.apply(RPC, arguments)
    rpcApp.expose({
      nexridge: {
        query: function query(queryPayload) {
          let q = db.queryBuilder()
          _.merge(q, queryPayload)
          return q
        }
      }
    })
  },
  connect: (config) => {
    db = knex(config)
  }
}
