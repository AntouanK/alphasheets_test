'use strict';
const flux_1 = require("flux");
const consologger_1 = require("consologger");
let logger = new consologger_1.default();
exports.myDispatcher = new flux_1.Dispatcher();
logger
    .grey('[dispatcher] ')
    .prefix();
exports.myDispatcher
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
//# sourceMappingURL=Dispatcher.js.map