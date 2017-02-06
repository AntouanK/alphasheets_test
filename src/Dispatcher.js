
'use strict';

const Dispatcher    = require('flux').Dispatcher;
const Consologger   = require('consologger');

let logger          = new Consologger();
const myDispatcher  = new Dispatcher();


logger
.grey('[dispatcher] ')
.prefix();

myDispatcher
.register(payload => {

  logger
  .grey(`${(new Date()).toISOString()} | `)
  .blue('  actionType: ')
  .blue(payload.action.actionType)
  .print();

  logger
  .green('payload ⤵')
  .print();
  console.log(payload.action);
});

module.exports = myDispatcher;
