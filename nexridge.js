'use strict'
const RPC = require('socket.io-rpc')
const debug = require('debug')('nexridge:server')
const express = require('express')
const knex = require('knex')

function listen() {
  var rpcApp = RPC.apply(RPC, arguments)
  rpcApp.expose({
    query: function query(JSON){
      let q = knex.queryBuilder()
      _.merge(q, JSON)
      return q
    }
  })
}
module.exports = listen
