
'use strict';

const React         = require('react');
const Immutable     = require('immutable');

const PostStyle =
  { padding: '6px'
  , boxShadow: '0px 2px 6px 2px rgba(0,0,0,0.5)'
  , display: 'flex'
  , flexDirection: 'column'
  };
const MetaRowStyle =
  { color: '#444'
  , fontSize: 'small'
  , margin: '2px 0'
};
const BottomRowStyle =
  { display: 'flex'
  , flexDirection: 'row'
  , justifyContent: 'flex-end'
  };
const ReplyDivStyle =
  { cursor: 'pointer'
  , textDecoration: 'underline'
  };


const Post = React.createClass({

  displayName: 'Post',

  propTypes:
    { itemsMap: React.PropTypes.instanceOf(Immutable.Map)
    , postId: React.PropTypes.string.isRequired
    },

  render() {
    let itemsMap  = this.props.itemsMap;
    let postId    = this.props.postId;

    if(!itemsMap.has(postId)){
      //  handle error case
    }

    let post      = itemsMap.get(postId).toJS();
    let createdAt = new Date(post.createdAt);

    return (
      <div style={PostStyle}>
        <div style={MetaRowStyle}>
          {`from: ${post.author} @ ${createdAt}`}
        </div>
        <h3>{post.title}</h3>
        <div>{post.content}</div>
        <div style={BottomRowStyle}>
          <div style={ReplyDivStyle}>{'reply'}</div>
        </div>
      </div>
    );
  }
});

module.exports = Post;
