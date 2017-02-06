
'use strict';

const React           = require('react');
const Immutable       = require('immutable');
const toggleReplyForm = require('../actions/toggleReplyForm');
const setReplyAuthor  = require('../actions/setReplyAuthor');
const setReplyContent = require('../actions/setReplyContent');
const submitReply     = require('../actions/submitReply');


const ReplyFormStyle =
  { padding: '6px'
  , display: 'flex'
  , flexDirection: 'column'
  , backgroundColor: '#c4c4c4'
  };
const TopRowStyle =
  { display: 'flex'
  , flexDirection: 'row'
  , justifyContent: 'space-between'
  , margin: '10px 0'
  , color: '#444'
  , fontSize: 'small'
  };
const BottomRowStyle =
  { display: 'flex'
  , flexDirection: 'row'
  , justifyContent: 'flex-end'
  , margin: '10px 0'
  };
const CloseDivStyle =
  { cursor: 'pointer'
  , fontWeight: 'bold'
  };
const AuthorInputBoxStyle =
  { display: 'flex'
  , margin: '10px 0'
  };
const UserInputStyle =
  { backgroundColor: 'rgba(0,0,0,0)'
  , border: 'none'
  , borderBottom: '1px solid black'
  , margin: '0 10px'
  };

const ReplyForm = React.createClass({

  displayName: 'ReplyForm',

  propTypes:
    { isOpen: React.PropTypes.bool.isRequired
    , replyAuthor: React.PropTypes.string
    , replyContent: React.PropTypes.string
    , targetItem: React.PropTypes.instanceOf(Immutable.Map)
    },

  handleClose(){
    toggleReplyForm({ makeOpen: false });
  },

  handleTextChange(ev){
    let replyContent = ev.target.value;
    setReplyContent({ content: replyContent });
  },

  handleAuthorChange(ev){
    let replyAuthor = ev.target.value;
    setReplyAuthor({ author: replyAuthor });
  },

  handleSubmit(){
    submitReply();
  },

  render() {
    let content = [];

    if(this.props.isOpen === true
    && this.props.targetItem !== undefined
    ){
      let targetItem = this.props.targetItem.toJS();

      let topRow = (
        <div
          key='topRow'
          style={TopRowStyle}
        >
          <div
            onClick={this.handleClose}
            style={CloseDivStyle}
          >
            {'X'}
          </div>
          <div>{`Replying to ${targetItem.author}`}</div>
        </div>
      );

      let authorRow = (
        <div
          key='authorInput'
          style={AuthorInputBoxStyle}
        >
          <label>{'user: '}</label>
          <input
            onChange={this.handleAuthorChange}
            style={UserInputStyle}
            value={this.props.replyAuthor}
          />
        </div>
      );

      content =
        [ topRow
        , authorRow
        , <textarea
          key='textArea'
          onChange={this.handleTextChange}
          rows='6'
          value={this.props.replyContent}
          />
        , <div
          key='bottomRow'
          style={BottomRowStyle}
          >
            <button onClick={this.handleSubmit}>{'reply'}</button>
          </div>
        ];
    }


    return (
      <div style={ReplyFormStyle}>
        {content}
      </div>
    );
  }
});

module.exports = ReplyForm;
