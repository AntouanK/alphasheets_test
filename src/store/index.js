
'use strict';

const dispatcher    = require('../Dispatcher');
const Immutable     = require('immutable');
const uuid          = require('uuid');
const EventEmitter  = require('events').EventEmitter;
const assign        = require('object-assign');


const CHANGE_EVENT  = 'CHANGE_EVENT';

const UIState =
  { replyFormOpen: false
  , replyTargetItem: undefined
  };

//  initialise app state
let _ROOT =
  Immutable
  .fromJS(
    { Items: Immutable.fromJS({})
    , UIState: Immutable.fromJS(UIState)
    , Posts: Immutable.fromJS([])
    }
  );

(() => {
  /* hardcode a post to show, TEST purposes only!
  */
  let newPost =
    { id: uuid.v1()
    , type: 'POST'
    , author: 'Alice'
    , title: 'Lorem Ipsum'
    , content:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy'
      + 'eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed '
      + ' diam voluptua. At vero eos et accusam et justo duo dolores et ea '
      + 'rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem '
      + 'ipsum dolor sit amet.'
    , createdAt: Date.now()
    , children: []
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
})();


const Store = assign({}, EventEmitter.prototype, {

  getRoot: () => _ROOT,

  emitChange() { this.emit(CHANGE_EVENT); },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },

  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); },

  dispatcherIndex: dispatcher.register(payload => {

    var action = payload.action;

    switch(action.actionType) {
      //  ------------------------------------------  toggle-reply-form ------
      case 'toggle-reply-form':
        let newUiState =
          _ROOT
          .get('UIState')
          .merge(
            Immutable.fromJS(
              { replyFormOpen: !!action.makeOpen
              , replyTargetItem: _ROOT.getIn(['Items', action.targetItemId])
              }
            )
          );
        _ROOT =
          _ROOT
          .set('UIState', newUiState);
        Store.emitChange();
        break;
      //  ------------------------------------------  add-item ------
      case 'add-item':
        let newItemMap = Immutable.fromJS({ [action.item.id]: action.item });
        let newItems = _ROOT.get('Items').merge(newItemMap);
        _ROOT =
          _ROOT
          .set('Items', newItems);
        Store.emitChange();
        break;

      //  ----------------------------------------------------------------------
    }

    return true;
    // No errors. Needed by promise in Dispatcher.
  })

});


module.exports = Store;
