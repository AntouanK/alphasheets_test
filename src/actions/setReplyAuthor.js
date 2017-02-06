
'use strict';

var dispatcher  = require('../Dispatcher');

module.exports = ({ author }) => {
  dispatcher
  .dispatch({
    source: 'VIEW_ACTION',
    action:
      { actionType: 'set-reply-author'
      , author
      }
  });
};
