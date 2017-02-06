
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

//  ------------------------  HANDLERS  ------------------------

let handleToggleReplyform = (action, state) =>
  {
    let newUiState =
      state
      .get('UIState')
      .merge(
        Immutable.fromJS(
          { replyFormOpen: !!action.makeOpen
          , replyTargetItem: state.getIn(['Items', action.targetItemId])
          }
        )
      );

    return state.set('UIState', newUiState);
  };

let handleAddItem = (action, state) =>
  {
    let newItemMap = Immutable.fromJS({ [action.item.id]: action.item });
    let newItems = state.get('Items').merge(newItemMap);
    return state.set('Items', newItems);
  };

let handleSetReplyContent = (action, state) =>
  {
    let newUiState =
      state
      .get('UIState')
      .merge(
        Immutable.fromJS({ replyContent: action.content })
      );
    return state.set('UIState', newUiState);
  };

let handleSubmitReply = (action, state) =>
  {
    //  make sure we have valid content and target
    let content = state.getIn(['UIState', 'replyContent']);
    if(typeof content !== 'string'
    || content.trim().length < 1){
      throw new Error('submiting a reply when content is invalid');
    }
    let targetItemId = state.getIn(['UIState', 'replyTargetItem', 'id']);
    let targetItemInMap = state.getIn(['Items', targetItemId]);
    if(targetItemInMap === undefined){
      throw new Error('item not found in the root items map');
    }

    //  make new comment item
    let newComment =
      { id: uuid.v1()
      , type: 'COMMENT'
      , author: 'Alice'
      , content
      , createdAt: Date.now()
      , children: []
      };

    let newState = handleAddItem({ item: newComment }, state);

    //  add it as a child to the target one
    let children =
      targetItemInMap
      .get('children')
      .push(newComment.id)
      .toJS();

    targetItemInMap =
      targetItemInMap
      .merge({ children })
      .toJS();

    let newItemsMap =
      newState
      .get('Items')
      .merge({ [targetItemInMap.id]: targetItemInMap })
      .toJS();

    //  clean up the reply form state
    let newUiState =
      state
      .get('UIState')
      .merge(
        Immutable.fromJS(
          { replyContent: undefined
          , replyFormOpen: false
          , replyTargetItem: undefined
          }
        )
      );

    return newState
    .merge({ Items: newItemsMap })
    .merge({ UIState: newUiState });
  };



const Store = assign({}, EventEmitter.prototype, {

  getRoot: () => _ROOT,

  emitChange() { this.emit(CHANGE_EVENT); },

  addChangeListener(cb) { this.on(CHANGE_EVENT, cb); },

  removeChangeListener(cb) { this.removeListener(CHANGE_EVENT, cb); },

  dispatcherIndex: dispatcher.register(payload => {

    var action = payload.action;

    switch(action.actionType) {
      //  ------------------------------------------  toggle-reply-form
      case 'toggle-reply-form':
        _ROOT = handleToggleReplyform(action, _ROOT);
        Store.emitChange();
        break;

      //  ------------------------------------------  add-item
      case 'add-item':
        _ROOT = handleAddItem(action, _ROOT);
        Store.emitChange();
        break;

      //  ------------------------------------------  set-reply-content
      case 'set-reply-content':
        _ROOT = handleSetReplyContent(action, _ROOT);
        Store.emitChange();
        break;

      //  ------------------------------------------  submit-reply
      case 'submit-reply':
        _ROOT = handleSubmitReply(action, _ROOT);
        Store.emitChange();
        break;
      //  ----------------------------------------------------------------------
    }

    return true;
    // No errors. Needed by promise in Dispatcher.
  })

});


module.exports = Store;
