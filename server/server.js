'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

//const { Ignitor } = require('@adonisjs/ignitor')
//
//new Ignitor(require('@adonisjs/fold'))
//  .appRoot(__dirname)
//  .fireHttpServer()
//  .catch(console.error)

const { Ignitor } = require('@adonisjs/ignitor')
const https = require('https')
const path = require('path')
const fs = require('fs')
//const pem = require('pem')

//.config({
//athOpenSSL: 'D:\\ssh'
//
//
//.createCertificate({ days: 1, selfSigned: true }, (error, keys) => {
//f (error) {
// return console.log(error)
//



const options = {
  key :  fs.readFileSync(path.join(__dirname, './privatekey.pem')),
  cert : fs.readFileSync(path.join(__dirname, './certification.pem'))
}

new Ignitor(require('@adonisjs/fold'))
.appRoot(__dirname)
.fireHttpServer((handler) => {
  return https.createServer(options, handler)
})
.catch(console.error)
