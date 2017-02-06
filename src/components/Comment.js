
'use strict';

const React           = require('react');
const Immutable       = require('immutable');
const toggleReplyForm = require('../actions/toggleReplyForm');

const CommentStyle =
  { display: 'flex'
  , flexDirection: 'column'
  , margin: '0 0 0 30px'
  };
const CommentBoxStyle =
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
  , fontWeight: 'bold'
  , margin: '10px'
  , padding: '6px 8px'
  , backgroundColor: '#cacaca'
  , boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.5)'
  };


const Comment = React.createClass({

  displayName: 'Comment',

  propTypes:
    { commentId: React.PropTypes.string.isRequired
    , itemsMap: React.PropTypes.instanceOf(Immutable.Map)
  },

  handleClick(){
    toggleReplyForm({ makeOpen: true, targetItemId: this.props.commentId });
  },

  render() {
    let itemsMap  = this.props.itemsMap;
    let commentId = this.props.commentId;

    if(!itemsMap.has(commentId)){
      //  handle error case
    }

    let comment   = itemsMap.get(commentId).toJS();
    let createdAt = new Date(comment.createdAt);
    let childrenComponents =
      comment
      .children
      .map(childCommentId => (
        <Comment
          commentId={childCommentId}
          itemsMap={itemsMap}
          key={childCommentId}
        />
      ));

    console.log('comment');
    console.log(comment);

    return (
      <div style={CommentStyle}>
        <div style={CommentBoxStyle}>
          <div style={MetaRowStyle}>
            {`from: ${comment.author} @ ${createdAt}`}
          </div>
          <h3>{comment.title}</h3>
          <div>{comment.content}</div>
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

module.exports = Comment;
