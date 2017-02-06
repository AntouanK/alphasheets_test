
'use strict';

var dispatcher  = require('../Dispatcher');

module.exports = ({ makeOpen, targetItemId }) => {
  dispatcher
  .dispatch({
    source: 'VIEW_ACTION',
    action:
      { actionType: 'toggle-reply-form'
      , makeOpen
      , targetItemId
      }
  });
};
