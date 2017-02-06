
'use strict';

const dispatcher    = require('../Dispatcher');
const Immutable     = require('immutable');
const uuid          = require('uuid');
const EventEmitter  = require('events').EventEmitter;
const assign        = require('object-assign');


const CHANGE_EVENT  = 'CHANGE_EVENT';

//  initialise app state
let _ROOT =
  Immutable
  .fromJS(
    { Items: {}
    , UIState: {}
    , Posts: []
    }
  );


/* hardcode a post to show, TEST purposes only!
*/
console.log('test');
let newPost =
  { id: uuid.v1()
  , type: 'POST'
  , author: 'Alice'
  , title: 'Lorem Ipsum'
  , content:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy '
    + 'eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed '
    + 'diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. '
    + 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum '
    + 'dolor sit amet.'
  , createdAt: Date.now()
  };

//  update the ROOT state
//  add the item
let newItems = Immutable.fromJS({ [newPost.id]: newPost });
_ROOT =
  _ROOT
  .set('Items', newItems);
//  update the posts list
let newPosts = Immutable.fromJS([newPost.id]);
_ROOT =
  _ROOT
  .set('Posts', newPosts);


const Store = assign({}, EventEmitter.prototype, {

  getRoot: () => _ROOT,

  emitChange() { this.emit(CHANGE_EVENT); },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },

  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); },

  dispatcherIndex: dispatcher.register(payload => {

    var action = payload.action;

    switch(action.actionType) {

      //  ------------------------------------------  fetch-list-request -------
      case 'fetch-list-request':

        Store.emitChange();
        break;


      //  ------------------------------------------  fetch-list-response ------
      case 'fetch-list-response':

        _ROOT.UIState =
          _ROOT.UIState.set('list-request-state', action.status);
        Store.emitChange();
        break;

      //  ----------------------------------------------------------------------
    }


    return true;
    // No errors. Needed by promise in Dispatcher.
  })

});


module.exports = Store;
