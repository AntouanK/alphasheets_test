
'use strict';

var dispatcher  = require('../Dispatcher');

module.exports = ({ content }) => {
  dispatcher
  .dispatch({
    source: 'VIEW_ACTION',
    action:
      { actionType: 'set-reply-content'
      , content
      }
  });
};
