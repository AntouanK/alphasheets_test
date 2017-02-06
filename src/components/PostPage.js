
'use strict';

const React   = require('react');
const Store   = require('../store');
const Post    = require('../components/Post');

const PostPageStyle =
  { margin: '20px'
  };

const PostPage = React.createClass(
  { displayName: 'PostPage'

  , getInitialState() { return Store.getRoot(); }

  , componentDidMount: function() { Store.addChangeListener(this._onChange); }

  , shouldComponentUpdate(nextProps, nextState) {
      return nextState !== this.state;
    }

  , componentWillUnmount: function() {
      Store.removeChangeListener(this._onChange);
    }

  /* eslint react/no-set-state:0 */
  , _onChange: function() {
      this.setState(Store.getRoot());
    }

  , render() {
      let state         = this.state.toJS();
      let firstPostId   = state.Posts.pop();

      return (
        <div style={PostPageStyle}>
          <Post
            itemsMap={this.state.get('Items')}
            postId={firstPostId}
          />
        </div>
      );
    }
});

module.exports = PostPage;
