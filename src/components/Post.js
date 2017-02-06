
'use strict';

const React           = require('react');
const Immutable       = require('immutable');
const toggleReplyForm = require('../actions/toggleReplyForm');
const Comment         = require('../components/Comment');


const PostStyle =
  { display: 'flex'
  , flexDirection: 'column'
  };
const PostBoxStyle =
  { padding: '6px'
  , margin: '6px 0'
  , boxShadow: '0px 2px 6px 2px rgba(0,0,0,0.5)'
  , display: 'flex'
  , backgroundColor: '#efefef'
  , flexDirection: 'column'
  , transform: 'translateZ(0)'
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
  , fontWeight: 'bold'
  , margin: '10px'
  , padding: '10px'
  , backgroundColor: '#cacaca'
  };


const Post = React.createClass({

  displayName: 'Post',

  propTypes:
    { itemsMap: React.PropTypes.instanceOf(Immutable.Map)
    , postId: React.PropTypes.string.isRequired
  },

  handleClick(){
    toggleReplyForm({ makeOpen: true, targetItemId: this.props.postId });
  },

  render() {
    let itemsMap  = this.props.itemsMap;
    let postId    = this.props.postId;

    if(!itemsMap.has(postId)){
      //  handle error case
    }

    let post      = itemsMap.get(postId).toJS();
    let createdAt = new Date(post.createdAt);
    let childrenComponents =
      post
      .children
      .map(commentId => (
        <Comment
          commentId={commentId}
          itemsMap={itemsMap}
          key={commentId}
        />
      ));

    console.log('post');
    console.log(post);

    return (
      <div style={PostStyle}>
        <div style={PostBoxStyle}>
          <div style={MetaRowStyle}>
            {`from: ${post.author} @ ${createdAt}`}
          </div>
          <h3>{post.title}</h3>
          <div>{post.content}</div>
          <div style={BottomRowStyle}>
            <div
              onClick={this.handleClick}
              style={ReplyDivStyle}
            >
              {'Add comment'}
            </div>
          </div>
        </div>
        {childrenComponents}
      </div>
    );
  }
});

module.exports = Post;
