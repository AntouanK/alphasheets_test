
'use strict';

var dispatcher  = require('../Dispatcher');

module.exports = () => {
  dispatcher
  .dispatch({
    source: 'VIEW_ACTION',
    action:
      { actionType: 'submit-reply'
      }
  });
};
