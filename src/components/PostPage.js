
'use strict';

const React       = require('react');
const Store       = require('../store');
const Post        = require('../components/Post');
const ReplyForm   = require('../components/ReplyForm');

const PostPageStyle =
  { flex: '1'
  , display: 'flex'
  , flexDirection: 'column'
  , justifyContent: 'space-between'
  };
const PostListStyle =
  { display: 'flex'
  , flexDirection: 'column'
  , margin: '20px'
  };

const PostPage = React.createClass(
  { displayName: 'PostPage'

  , getInitialState() { return { appState: Store.getRoot() }; }

  , componentDidMount: function() { Store.addChangeListener(this._onChange); }

  , shouldComponentUpdate(nextProps, nextState) {
      return nextState !== this.state;
    }

  , componentWillUnmount: function() {
      Store.removeChangeListener(this._onChange);
    }

  /* eslint react/no-set-state:0 */
  , _onChange: function() {
      this.setState({ appState: Store.getRoot() });
    }

  , render() {
      let state         = this.state.appState;
      let firstPostId   = state.toJS().Posts.pop();

      return (
        <div style={PostPageStyle}>
          <div style={PostListStyle}>
            <Post
              itemsMap={state.get('Items')}
              postId={firstPostId}
            />
          </div>
          <ReplyForm
            isOpen={state.getIn(['UIState', 'replyFormOpen'])}
            targetItem={state.getIn(['UIState', 'replyTargetItem'])}
          />
        </div>
      );
    }
});

module.exports = PostPage;
